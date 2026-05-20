import { useEffect, useState } from "react";
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";

import { getItinerarios } from "../../api/itinerarios";
import {
  crearAsignacion,
  getAsignaciones,
  deleteAsignacion,
} from "../../api/asignaciones";
import api from "../../api/axios"; // para cuidadores

const AsignarCuidador = () => {
  const role = "admin";

  const [itinerarios, setItinerarios] = useState([]);
  const [guias, setCuidadores] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);

  const [form, setForm] = useState({
    itinerario: "",
    guia: "",
    fecha: "",
  });

  // cargar datos
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const resIti = await getItinerarios();
    const resGuia = await api.get("/guias");
    const resAsig = await getAsignaciones();

    setItinerarios(resIti.data);
    setGuias(resGuia.data);
    setAsignaciones(resAsig.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await crearAsignacion(form);
    setForm({ itinerario: "", guia: "", fecha: "" });

    cargarDatos();
  };

  const handleDelete = async (id) => {
    await deleteAsignacion(id);
    cargarDatos();
  };

  return (
    <Layout role={role}>
      <h2>Asignar Guia a Itinerario</h2>

      {/* FORMULARIO */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Itinerario</Form.Label>
              <Form.Select
                name="itinerario"
                value={form.itinerario}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar</option>
                {itinerarios.map((e) => (
                  <option
                    key={e._id}
                    value={e._id}
                  >
                    {e.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Guia</Form.Label>
              <Form.Select
                name="guia"
                value={form.guia}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar</option>
                {guias.map((c) => (
                  <option
                    key={c._id}
                    value={c._id}
                  >
                    {c.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          type="submit"
          className="mt-3"
        >
          Asignar
        </Button>
      </Form>

      {/* TABLA */}
      <h4 className="mt-5">Asignaciones</h4>

      <Table
        striped
        bordered
      >
        <thead>
          <tr>
            <th>Itinerario</th>
            <th>Guia</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {asignaciones.map((a) => (
            <tr key={a._id}>
              <td>{a.itinerario?.nombre}</td>
              <td>{a.guia?.nombre}</td>
              <td>{a.fecha?.split("T")[0]}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(a._id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default AsignarCuidador;
