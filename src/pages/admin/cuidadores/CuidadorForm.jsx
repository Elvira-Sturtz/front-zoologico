import { useEffect, useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../../components/Layout";
import CustomToast from "../../../components/CustomToast";
import {
  createCuidador,
  getCuidador,
  updateCuidador,
} from "../../../api/cuidadores";

const CuidadorForm = () => {
  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors, isSubmitting, isDirty },
    reset,
    watch,
  } = useForm({ mode: "onChange", defaultValues: { crearUsuario: "no" } });

  const navigate = useNavigate();
  const params = useParams();

  const role = "admin";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [toastVariant, setToastVariant] = useState("success");

  // Saber si eligió crear usuario
  const crearUsuario = watch("crearUsuario");

  //  Aviso al cerrar pestaña o recargar
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // confirmar cancelar
  const handleCancel = () => {
    if (isDirty) {
      const confirmar = window.confirm("Tienes cambios sin guardar. ¿Salir?");

      if (!confirmar) return;
    }
    navigate("/cuidadores");
  };

  // Cargar cuidador si estamos editando
  useEffect(() => {
    const cargarCuidador = async () => {
      if (!params.id) return;

      try {
        setLoading(true);

        const res = await getCuidador(params.id);

        reset({
          nombre: res.data.nombre || "",
          direccion: res.data.direccion || "",
          telefono: res.data.telefono || "",
          fechaIngreso: res.data.fechaIngreso
            ? res.data.fechaIngreso.split("T")[0]
            : "",

          crearUsuario: res.data.usuario ? "si" : "no",
        });
      } catch (err) {
        console.error(err);
        setError("Error al cargar el Cuidador");
      } finally {
        setLoading(false);
      }

      // setValue("nombre", res.data.nombre);
      // setValue("nombreCientifico", res.data.nombreCientifico);
      // setValue("descripcion", res.data.descripcion);
    };

    cargarCuidador();
  }, [params.id, reset]);

  // Guardar datos
  const onSubmit = async (data) => {
    setError("");
    try {
      if (params.id) {
        await updateCuidador(params.id, data);
        setToastVariant("success");
        setToastMsg("Cuidador actualizado correctamente");
      } else {
        await createCuidador(data);

        setToastVariant("success");

        setToastMsg("Cuidador creado correctamente");
      }
      setShowToast(true);

      setTimeout(() => {
        navigate("/cuidadores");
      }, 1500);

      //navigate("/especies");
    } catch (error) {
      console.error(error);

      setError("Error al guardar el Cuidador");

      setToastVariant("danger");
      setToastMsg("Error al guardar el Cuidador");
      setShowToast(true);
    }
  };

  return (
    <Layout role={role}>
      <h2 className="mb-4">{params.id ? "Editar" : "Nuevo"} Cuidador </h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <CustomToast
        show={showToast}
        message={toastMsg}
        onClose={() => setShowToast(false)}
        variant={toastVariant}
      />

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* NOMBRE */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el Nombre del Cuidador"
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 3,
                  message: "Mínimo 3 caracteres",
                },
              })}
              isInvalid={errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre?.message}
            </Form.Control.Feedback>
          </Form.Group>
          {/* DIRECCIÓN */}
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>

            <Form.Control
              type="text"
              placeholder="Dirección del Cuidador"
              {...register("direccion")}
            />
          </Form.Group>
          {/* TELÉFONO */}
          <Form.Group className="mb-3">
            <Form.Label>Telefono</Form.Label>

            <Form.Control
              as="text"
              placeholder="Teléfono del Cuidador"
              {...register("telefono", {
                maxLength: {
                  value: 15,
                  message: "Máximo 15 caracteres",
                },
              })}
              isInvalid={errors.telefono}
            />

            <Form.Control.Feedback type="invalid">
              {errors.telefono?.message}
            </Form.Control.Feedback>
          </Form.Group>
          {/* FECHA */}
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Ingreso</Form.Label>

            <Form.Control
              as="date"
              {...register("fechaIngreso", {
                required: "La fecha de ingreso es obligatoria",
              })}
              isInvalid={errors.fechaIngreso}
            />

            <Form.Control.Feedback type="invalid">
              {errors.fechaIngreso?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* CREAR USUARIO */}
          {!params.id && (
            <Form.Group className="mb-3">
              <Form.Label>
                ¿Crear una cuenta de usuario para este cuidador?
              </Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Sí"
                  value="si"
                  {...register("crearUsuario", {
                    required: "Debe seleccionar una opción",
                  })}
                />

                <Form.Check
                  inline
                  type="radio"
                  label="No"
                  value="no"
                  {...register("crearUsuario", {
                    required: "Debe seleccionar una opción",
                  })}
                />
              </div>

              {errors.crearUsuario && (
                <div className="text-danger">{errors.crearUsuario.message}</div>
              )}
            </Form.Group>
          )}

          {/* DATOS DEL USUARIO */}
          {!params.id && crearUsuario === "si" && (
            <>
              <hr />

              <h5 className="mb-3">Datos de acceso</h5>

              {/* USERNAME */}
              <Form.Group className="mb-3">
                <Form.Label>Nombre de usuario</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Nombre de usuario"
                  {...register("username", {
                    required:
                      crearUsuario === "si"
                        ? "El nombre de usuario es obligatorio"
                        : false,
                  })}
                  isInvalid={errors.username}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.username?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* EMAIL */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>

                <Form.Control
                  type="email"
                  placeholder="correo@ejemplo.com"
                  {...register("email", {
                    required:
                      crearUsuario === "si" ? "El email es obligatorio" : false,
                  })}
                  isInvalid={errors.email}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* PASSWORD */}
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  {...register("password", {
                    required:
                      crearUsuario === "si"
                        ? "La contraseña es obligatoria"
                        : false,
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
            </>
          )}

          {/* BOTONES  */}
          <div className="d-flex gap-2">
            <Button
              type="submit"
              className="cursor-pointer font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar Cuidador"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              // onClick={() => navigate("/especies")}
            >
              Cancelar
            </Button>
          </div>
        </Form>
      )}
    </Layout>
  );
};

export default CuidadorForm;
