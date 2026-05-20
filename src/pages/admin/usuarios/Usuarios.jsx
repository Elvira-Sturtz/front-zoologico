import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";
import CustomToast from "../../components/CustomToast";

import { getUsuarios, deleteUsuario } from "../../api/usuarios";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const cargarUsuarios = async () => {
    const res = await getUsuarios();
    setUsuarios(res.data);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const eliminar = async (id) => {
    const confirm = window.confirm("¿Eliminar usuario?");
    if (!confirm) return;

    try {
      await deleteUsuario(id);
      setToastMsg("Usuario eliminado");
      setToastVariant("success");
      setShowToast(true);
      cargarUsuarios();
    } catch {
      setToastMsg("Error al eliminar");
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  return (
    <Layout role="admin">
      <h2>Usuarios</h2>

      <Link
        to="/usuarios/nuevo"
        className="btn btn-primary mb-3"
      >
        Nuevo Usuario
      </Link>

      <CustomToast
        show={showToast}
        message={toastMsg}
        onClose={() => setShowToast(false)}
        variant={toastVariant}
      />

      <Table
        striped
        bordered
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((u) => (
            <tr key={u._id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <Link
                  to={`/usuarios/${u._id}`}
                  className="btn btn-sm btn-primary"
                >
                  Editar
                </Link>

                <Button
                  size="sm"
                  variant="danger"
                  className="ms-2"
                  onClick={() => eliminar(u._id)}
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

export default Usuarios;
