import { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";

import Layout from "../../components/Layout";
import { getMisItinerarios } from "../../api/asignaciones";

const MisItinerarios = () => {
  const [itinerarios, setItinerarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    cargarItinerarios();
  }, []);

  const cargarItinerarios = async () => {
    try {
      const res = await getMisItinerarios(userId);

      setItinerarios(res.data);
    } catch (err) {
      setError("Error al cargar los itinerarios");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout role="guia">
      <h2>Mis Itinerarios</h2>

      {/* Loading */}
      {loading && <Spinner animation="border" />}

      {/* Error */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Tabla */}
      {!loading && !error && (
        <Table
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>Itinerario</th>
              <th>Duracion</th>
              <th>Fecha Asignación</th>
            </tr>
          </thead>

          <tbody>
            {itinerarios.length > 0 ? (
              itinerarios.map((e) => (
                <tr key={e._id}>
                  <td>{e.itinerario?.codigo}</td>

                  <td>{e.itinerario?.duracion}</td>

                  <td>{e.fecha?.split("T")[0]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No tenés itinerarios asignados</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Layout>
  );
};

export default MisItinerarios;
