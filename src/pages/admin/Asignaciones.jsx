import { useEffect, useState } from "react";
import { Form, Button, Table, Row, Col, ButtonGroup } from "react-bootstrap";
import Layout from "../../components/Layout";

import { getEspecies } from "../../api/especies";
import {
  crearAsignacionCuidador,
  getAsignacionesCuidador,
  deleteAsignacionCuidador,
  crearAsignacionGuia,
  getAsignacionesGuia,
  deleteAsignacionGuia

} from "../../api/asignaciones";
import api from "../../api/axios"; // para cuidadores e itinerarios/guias

const AsignarCuidador = () => {
  const role = "admin";

  // Estado para controlar qué relación estamos gestionando
  const [tipoVista, setTipoVista] = useState("cuidadores"); // 'cuidadores' o 'guias'

  // Estados compartidos y específicos
  const [especies, setEspecies] = useState([]);
  const [cuidadores, setCuidadores] = useState([]);
  const [guias, setGuias] = useState([]);
  const [itinerarios, setItinerarios] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);

  // Formulario unificado
  const [form, setForm] = useState({
    especie: "",
    cuidador: "",
    fecha: "",
    guia: "",
    itinerario: "",
    hora: "",
  });

  useEffect(() => {
    cargarDatos();
  }, [tipoVista]); // Se recarga inteligentemente al cambiar de pestaña

  const cargarDatos = async () => {
    try {
      if (tipoVista === "cuidadores") {
        const resEsp = await getEspecies();
        const resCuid = await api.get("/cuidadores");
        const resAsig = await getAsignacionesCuidador(); // Endpoint para relaciones cuidadores-especies

        setEspecies(resEsp.data);
        setCuidadores(resCuid.data);
        setAsignaciones(resAsig.data);
      } else {
        // Carga de datos para la pestaña de Guías
        const resGuias = await api.get("/guias");
        const resItin = await api.get("/itinerarios");
        const resAsigGuias = await api.get("/asignaciones-guias"); // Tu endpoint respectivo para guías

        setGuias(resGuias.data);
        setItinerarios(resItin.data);
        setAsignaciones(resAsigGuias.data);
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tipoVista === "cuidadores") {
      await crearAsignacion({
        especie: form.especie,
        cuidador: form.cuidador,
        fecha: form.fecha,
      });
      setForm({ ...form, especie: "", cuidador: "", fecha: "" });
    } else {
      // Registro de relación Guía - Itinerario
      await api.post("/asignaciones-guias", {
        guia: form.guia,
        itinerario: form.itinerario,
        hora: form.hora,
      });
      setForm({ ...form, guia: "", itinerario: "", hora: "" });
    }

    cargarDatos();
  };

  const handleDelete = async (id) => {
    if (tipoVista === "cuidadores") {
      await deleteAsignacionCuidador(id);
    } else {
      await api.delete(`/asignaciones-guias/${id}`);
    }
    cargarDatos();
  };

  return (
    <Layout role={role}>
      
      <div className="container-fluid pt-4"> 
      <h2 className="mb-4">Gestión de Asignaciones</h2>

      {/* Botones de Control de Flujo */}
      <ButtonGroup className="mb-4 w-100">
        <Button
          variant={tipoVista === "cuidadores" ? "primary" : "outline-primary"}
          onClick={() => setTipoVista("cuidadores")}
        >
          Cuidadores a Especies
        </Button>
        <Button
          variant={tipoVista === "guias" ? "primary" : "outline-primary"}
          onClick={() => setTipoVista("guias")}
        >
          Guías a Itinerarios
        </Button>
      </ButtonGroup>

      {/* FORMULARIO DINÁMICO */}
      <Form onSubmit={handleSubmit}>
        <Row>
          {tipoVista === "cuidadores" ? (
            <>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Especie</Form.Label>
                  <Form.Select name="especie" value={form.especie} onChange={handleChange} required>
                    <option value="">Seleccionar</option>
                    {especies.map((e) => (
                      <option key={e._id} value={e._id}>{e.nombre}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Cuidador</Form.Label>
                  <Form.Select name="cuidador" value={form.cuidador} onChange={handleChange} required>
                    <option value="">Seleccionar</option>
                    {cuidadores.map((c) => (
                      <option key={c._id} value={c._id}>{c.nombre}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Fecha de Asignación</Form.Label>
                  <Form.Control type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </>
          ) : (
            <>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Guía</Form.Label>
                  <Form.Select name="guia" value={form.guia} onChange={handleChange} required>
                    <option value="">Seleccionar</option>
                    {guias.map((g) => (
                      <option key={g._id} value={g._id}>{g.nombre}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Itinerario (Código / Zona)</Form.Label>
                  <Form.Select name="itinerario" value={form.itinerario} onChange={handleChange} required>
                    <option value="">Seleccionar</option>
                    {itinerarios.map((i) => (
                      <option key={i._id} value={i._id}>
                        {i.codigo} - Recorrido: {i.duracion} min
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Hora del Recorrido</Form.Label>
                  <Form.Control type="time" name="hora" value={form.hora} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </>
          )}
        </Row>

        <Button type="submit" className="mt-3">
          Asignar {tipoVista === "cuidadores" ? "Cuidador" : "Guía"}
        </Button>
      </Form>

<hr />
      {/* TABLA DINÁMICA */}
      <h4 className="mt-5">
        {tipoVista === "cuidadores" ? "Asignaciones de Cuidadores" : "Horarios y Turnos de Guías"}
      </h4>

      <Table striped bordered responsive>
        <thead>
          <tr>
            {tipoVista === "cuidadores" ? (
              <>
                <th>Especie</th>
                <th>Cuidador</th>
                <th>Fecha de Inicio</th>
              </>
            ) : (
              <>
                <th>Guía</th>
                <th>Código Itinerario</th>
                <th>Hora Asignada</th>
              </>
            )}
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {asignaciones.map((a) => (
            <tr key={a._id}>
              {tipoVista === "cuidadores" ? (
                <>
                  <td>{a.especie?.nombre}</td>
                  <td>{a.cuidador?.nombre}</td>
                  <td>{a.fecha?.split("T")[0]}</td>
                </>
              ) : (
                <>
                  <td>{a.guia?.nombre}</td>
                  <td>{a.itinerario?.codigo}</td>
                  <td>{a.hora} hs</td>
                </>
              )}
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(a._id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      </div>
    </Layout>
  );
};

export default AsignarCuidador;
