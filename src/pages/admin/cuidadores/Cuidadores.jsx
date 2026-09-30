import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

import Layout from "../../../components/Layout";

import { deleteCuidador, getCuidadores } from "../../../api/cuidadores";

const Cuidadores = () => {
  const [cuidadores, setCuidadores] = useState([]);

  const role = "admin";

  const cargarCuidadores = async () => {
    try {
      const res = await getCuidadores();
      console.log(res.data);

      setCuidadores(res.data);
    } catch (error) {
      console.error("Error al cargar los cuidadores", error);
    }
  };

  useEffect(() => {
    cargarCuidadores();
  }, [cuidadores]);

  const eliminarCuidador = async (id) => {
    try {
      await deleteCuidador(id);
      cargarCuidadores(); // refresca
    } catch (error) {
      console.error("Error al eliminar el cuidador", error);
    }
  };

  return (
    <Layout role={role}>
      <h2>Cuidadores</h2>

      <Button
        as={Link}
        to="/cuidadores/nuevo"
        className="mb-3"
      >
        Nuevo Cuidador
      </Button>

      <Table
        striped
        bordered
        hover
      >
        <thead>
          <tr>
            <th>Nombre </th>
            <th>Dirección</th>
            <th>Telefono</th>
            <th>Fecha de Ingreso</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {cuidadores.map((cuidador) => (
            <tr key={cuidador._id}>
              <td>{cuidador.nombre}</td>
              <td>{cuidador.direccion}</td>
              <td>{cuidador.telefono}</td>

              <td>
                {cuidador.fechaIngreso
                  ? cuidador.fechaIngreso.split("T")[0]
                  : ""}
              </td>

              <td>
                {cuidador.usuario ? cuidador.usuario.username : "Sin usuario"}
              </td>

              <td>
                <Button
                  as={Link}
                  to={`/cuidadores/${cuidador._id}`}
                  size="sm"
                >
                  Editar
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  className="ms-2"
                  onClick={() => eliminarCuidador(cuidador._id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
          cuidador{" "}
        </tbody>
      </Table>
    </Layout>
  );
};

export default Cuidadores;
