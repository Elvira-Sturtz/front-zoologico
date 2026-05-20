import { useEffect, useState } from "react";
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";

import { getEspecies } from "../../api/especies";
import {
  crearAsignacion,
  getAsignaciones,
  deleteAsignacion,
} from "../../api/asignaciones";
import api from "../../api/axios"; // para cuidadores

const AsignarCuidador = () => {
  const role = "admin";

  const [especies, setEspecies] = useState([]);
  const [cuidadores, setCuidadores] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);

  const [form, setForm] = useState({
    especie: "",
    cuidador: "",
    fecha: "",
  });

  // cargar datos
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const resEsp = await getEspecies();
    const resCuid = await api.get("/cuidadores");
    const resAsig = await getAsignaciones();

    setEspecies(resEsp.data);
    setCuidadores(resCuid.data);
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
    setForm({ especie: "", cuidador: "", fecha: "" });

    cargarDatos();
  };

  const handleDelete = async (id) => {
    await deleteAsignacion(id);
    cargarDatos();
  };

  return (
    <Layout role={role}>
      <h2>Asignar Cuidador a Especie</h2>

      {/* FORMULARIO */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Especie</Form.Label>
              <Form.Select
                name="especie"
                value={form.especie}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar</option>
                {especies.map((e) => (
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
              <Form.Label>Cuidador</Form.Label>
              <Form.Select
                name="cuidador"
                value={form.cuidador}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar</option>
                {cuidadores.map((c) => (
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
            <th>Especie</th>
            <th>Cuidador</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {asignaciones.map((a) => (
            <tr key={a._id}>
              <td>{a.especie?.nombre}</td>
              <td>{a.cuidador?.nombre}</td>
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
