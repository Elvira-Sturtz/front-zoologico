import { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../../components/Layout";
import CustomToast from "../../../components/CustomToast";

import {
  createUsuario,
  getUsuario,
  updateUsuario,
} from "../../../api/usuarios";

const UsuarioForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  // Cargar usuario si es edición
  useEffect(() => {
    const cargar = async () => {
      if (params.id) {
        try {
          setLoading(true);
          const res = await getUsuario(params.id);

          reset({
            nombre: res.data.nombre,
            direccion: res.data.direccion,
            telefono: res.data.telefono,
            email: res.data.email,
            rol: res.data.rol,
          });
        } catch {
          setToastVariant("danger");
          setToastMsg("Error al cargar usuario");
          setShowToast(true);
        } finally {
          setLoading(false);
        }
      }
    };

    cargar();
  }, [params.id, reset]);

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        await updateUsuario(params.id, data);
        setToastMsg("Usuario actualizado");
      } else {
        await createUsuario(data);
        setToastMsg("Usuario creado");
      }

      setToastVariant("success");
      setShowToast(true);

      setTimeout(() => navigate("/usuarios"), 1500);
    } catch {
      setToastVariant("danger");
      setToastMsg("Error al guardar");
      setShowToast(true);
    }
  };

  return (
    <Layout role="admin">
      <h2>{params.id ? "Editar Usuario" : "Nuevo Usuario"}</h2>

      <CustomToast
        show={showToast}
        message={toastMsg}
        onClose={() => setShowToast(false)}
        variant={toastVariant}
      />

      {loading ? (
        <Spinner />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              {...register("nombre", {
                required: "El nombre es obligatorio",
              })}
              isInvalid={errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Dirección */}
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control {...register("direccion")} />
          </Form.Group>

          {/* Teléfono */}
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              {...register("telefono", {
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Solo números",
                },
              })}
              isInvalid={errors.telefono}
            />
            <Form.Control.Feedback type="invalid">
              {errors.telefono?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              {...register("email", {
                required: "Email obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email inválido",
                },
              })}
              isInvalid={errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password */}
          {!params.id && (
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password", {
                  required: "Password obligatorio",
                  minLength: {
                    value: 6,
                    message: "Mínimo 6 caracteres",
                  },
                })}
                isInvalid={errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          {/* Rol */}
          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select {...register("rol", { required: true })}>
              <option value="">Seleccione rol</option>
              <option value="admin">Administrador</option>
              <option value="guia">Guía</option>
              <option value="cuidador">Cuidador</option>
            </Form.Select>
          </Form.Group>

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar Usuario"}
          </Button>
        </Form>
      )}
    </Layout>
  );
};

export default UsuarioForm;
