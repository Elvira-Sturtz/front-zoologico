import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

import Layout from "../../../components/Layout";

import { deleteHabitat, getHabitats } from "../../../api/habitats";

const Habitats = () => {
  const [habitats, setHabitats] = useState([]);

  const role = "admin";

  const cargarHabitats = async () => {
    try {
      const res = await getHabitats();
      console.log(res);
      setHabitats(res.data);
    } catch (error) {
      console.error("Error al cargar habitats", error);
    }
  };

  useEffect(() => {
    cargarHabitats();
  }, [habitats]);

  const eliminarHabitat = async (id) => {
    await deleteHabitat(id);
    cargarHabitats(); // refresca
  };

  return (
    <Layout role={role}>
      <h2>Habitats</h2>
      <Button
        as={Link}
        to="/habitats/nueva"
        className="mb-3"
      >
        Nueva Habitat
      </Button>
      <Table
        striped
        bordered
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Clima</th>
            <th>Vegetación predominante</th>
            <th>Continentes en los que se encuentran</th>
          </tr>
        </thead>
        <tbody>
          {habitats.map((habitat) => (
            <tr key={habitat._id}>
              <td>{habitat.nombre}</td>
              <td>{habitat.clima}</td>
              {/* Me gustaria que se pudiera desplegar desde el clima iincluido todoas las demas caracteristicas */}
              <td>
                <Button
                  as={Link}
                  to={`/habitats/${habitat._id}`}
                  size="sm"
                >
                  Editar
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  className="ms-2"
                  onClick={() => eliminarHabitat(habitat._id)}
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

export default Habitats;
