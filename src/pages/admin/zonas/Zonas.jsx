import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

import Layout from "../../../components/Layout";

import { deleteZona, getZonas } from "../../../api/zonas";

const Zonas = () => {
  const [zonas, setZonas] = useState([]);

  const role = "admin";

  const cargarZonas = async () => {
    try {
      const res = await getZonas();
      console.log(res);
      setZonas(res.data);
    } catch (error) {
      console.error("Error al cargar zonas", error);
    }
  };

  useEffect(() => {
    cargarZonas();
  }, [zonas]);

  const eliminarZona = async (id) => {
    await deleteZona(id);
    cargarZonas(); // refresca
  };

  return (
    <Layout role={role}>
      <h2>Zonas</h2>
      <Button
        as={Link}
        to="/zonas/nueva"
        className="mb-3"
      >
        Nueva Zona
      </Button>
      <Table
        striped
        bordered
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Extención que ocupa</th>
          </tr>
        </thead>
        <tbody>
          {zonas.map((zona) => (
            <tr key={zona._id}>
              <td>{zona.nombre}</td>
              <td>{zona.extension}</td>
              <td>
                <Button
                  as={Link}
                  to={`/zonas/${zona._id}`}
                  size="sm"
                >
                  Editar
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  className="ms-2"
                  onClick={() => eliminarZona(zona._id)}
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

export default Zonas;
