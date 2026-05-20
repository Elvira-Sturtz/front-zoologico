import { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";

import Layout from "../../components/Layout";
import { getMisEspecies } from "../../api/asignaciones";

const MisEspecies = () => {
  const [especies, setEspecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    cargarEspecies();
  }, []);

  const cargarEspecies = async () => {
    try {
      const res = await getMisEspecies(userId);

      setEspecies(res.data);
    } catch (err) {
      setError("Error al cargar especies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout role="cuidador">
      <h2>Mis Especies</h2>

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
              <th>Especie</th>
              <th>Nombre Científico</th>
              <th>Fecha Asignación</th>
            </tr>
          </thead>

          <tbody>
            {especies.length > 0 ? (
              especies.map((e) => (
                <tr key={e._id}>
                  <td>{e.especie?.nombre}</td>

                  <td>{e.especie?.nombreCientifico}</td>

                  <td>{e.fecha?.split("T")[0]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No tenés especies asignadas</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Layout>
  );
};

export default MisEspecies;
