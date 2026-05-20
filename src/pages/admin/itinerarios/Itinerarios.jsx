import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

import Layout from "../../../components/Layout";

import { deleteItinerario, getItinerarios } from "../../../api/itinerarios";

const Itinerarios = () => {
  const [itinerarios, setItinerarios] = useState([]);

  const role = "admin";

  const cargarItinerarios = async () => {
    try {
      const res = await getItinerarios();
      console.log(res);
      setItinerarios(res.data);
    } catch (error) {
      console.error("Error al cargar itinerarios", error);
    }
  };

  useEffect(() => {
    cargarItinerarios();
  }, [itinerarios]);

  const eliminarItinerario = async (id) => {
    await deleteItinerario(id);
    cargarItinerarios(); // refresca
  };

  return (
    <Layout role={role}>
      <h2>Itinerarios</h2>
      <Button
        as={Link}
        to="/itinerarios/nuevo"
        className="mb-3"
      >
        Nueva Itinerario
      </Button>
      <Table
        striped
        bordered
      >
        <thead>
          <tr>
            <th>Código de Itinerario</th>
            <th>Duración del Recorrido</th>
            <th>Longitud del itinerario</th>
            <th>Máximo número de Visitantes autorizado</th>
            <th>Nro de distintas Especies que Visita</th>
            {/* Creo que también deberia estar  zona*/}
          </tr>
        </thead>
        <tbody>
          {itinerarios.map((itinerario) => (
            <tr key={itinerario._id}>
              <td>{itinerario.codigo}</td>
              <td>{itinerario.duracion}</td>
              <td>{itinerario.longitud}</td>
              <td>{itinerario.maxVisitantes}</td>
              <td>
                <Button
                  as={Link}
                  to={`/itinerarios/${itinerario._id}`}
                  size="sm"
                >
                  Editar
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  className="ms-2"
                  onClick={() => eliminarItinerario(itinerario._id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
          itinerario{" "}
        </tbody>
      </Table>
    </Layout>
  );
};

export default Itinerarios;
