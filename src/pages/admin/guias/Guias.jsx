import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

import Layout from "../../../components/Layout";

import { deleteGuia, getGuias } from "../../../api/guias";

const Guias = () => {
  const [guias, setGuias] = useState([]);

  const role = "admin";

  const cargarGuias = async () => {
    try {
      const res = await getGuias();
      console.log(res.data);

      setGuias(res.data);
    } catch (error) {
      console.error("Error al cargar los guias", error);
    }
  };

  useEffect(() => {
    cargarGuias();
  }, [guias]);

  const eliminarGuia = async (id) => {
    try {
      await deleteGuia(id);
      cargarGuias(); // refresca
    } catch (error) {
      console.error("Error al eliminar el guia", error);
    }
  };

  return (
    <Layout role={role}>
      <h2>Guias</h2>

      <Button
        as={Link}
        to="/guias/nuevo"
        className="mb-3"
      >
        Nuevo Guia
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
          
        {guias.map((guia) => (
            <tr key={guia._id}>
              <td>{guia.nombre}</td>
              <td>{guia.direccion}</td>
              <td>{guia.telefono}</td>

              <td>
                {guia.fechaIngreso
                  ? guia.fechaIngreso.split("T")[0]
                  : ""}
              </td>

              <td>
                {guia.usuario ? guia.usuario.username : "Sin usuario"}
              </td>

              <td>
                <Button
                  as={Link}
                  to={`/guias/${guia._id}`}
                  size="sm"
                >
                  Editar
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  className="ms-2"
                  onClick={() => eliminarGuia(guia._id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))
        
  }


  
        </tbody>
      </Table>
    </Layout>
  );
};

export default Guias;
