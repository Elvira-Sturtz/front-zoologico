import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

import Layout from "../../../components/Layout";

import { deleteEspecie, getEspecies } from "../../../api/especies";

const Especies = () => {
  const [especies, setEspecies] = useState([]);

  const role = "admin";

  const cargarEspecies = async () => {
    try {
      const res = await getEspecies();
      console.log(res);
      setEspecies(res.data);
    } catch (error) {
      console.error("Error al cargar especies", error);
    }
  };

  useEffect(() => {
    cargarEspecies();
  }, [especies]);

  const eliminarEspecie = async (id) => {
    await deleteEspecie(id);
    cargarEspecies(); // refresca
  };

  return (
    <Layout role={role}>
      <h2>Especies</h2>
      <Button
        as={Link}
        to="/especies/nueva"
        className="mb-3"
      >
        Nueva Especie
      </Button>
      <Table
        striped
        bordered
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Científico</th>
            <th>Descripción</th>
            <th>Acciones</th>
            {/* Creo que también deberian estar habitats y zona*/}
          </tr>
        </thead>
        <tbody>
          {especies.map((especie) => (
            <tr key={especie._id}>
              <td>{especie.nombre}</td>
              <td>{especie.nombreCientifico}</td>
              <td>
                <Button
                  as={Link}
                  to={`/especies/${especie._id}`}
                  size="sm"
                >
                  Editar
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  className="ms-2"
                  onClick={() => eliminarEspecie(especie._id)}
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

export default Especies;
