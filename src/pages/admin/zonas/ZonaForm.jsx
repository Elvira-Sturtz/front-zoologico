import { useEffect, useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../../components/Layout";
import CustomToast from "../../../components/CustomToast";
import { createZona, getZona, updateZona } from "../../../api/zonas";

const ZonaForm = () => {
  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const params = useParams();
  const role = "admin";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [toastVariant, setToastVariant] = useState("success");

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
      const confirm = window.confirm("Tienes cambios sin guardar. ¿Salir?");
      if (!confirm) return;
    }
    navigate("/zonas");
  };

  // Cargar datos si es edición
  useEffect(() => {
    const cargarZona = async () => {
      if (params.id) {
        try {
          setLoading(true);
          const res = await getZona(params.id);

          reset({
            nombre: res.data.nombre || "",
            extencion: res.data.extencion || "",
          });
        } catch (err) {
          setError("Error al cargar la zona");
        } finally {
          setLoading(false);
        }

        // setValue("nombre", res.data.nombre);
        // setValue("nombreCientifico", res.data.nombreCientifico);
        // setValue("descripcion", res.data.descripcion);
      }
    };

    cargarZona();
  }, [params.id, reset]);

  // Guardar datos
  const onSubmit = async (data) => {
    setError("");
    try {
      if (params.id) {
        await updateZona(params.id, data);
        setToastMsg("Zona actualizada correctamente");
      } else {
        await createZona(data);

        setToastVariant("success");

        setToastMsg("Zona creada correctamente");
      }
      setShowToast(true);

      setTimeout(() => {
        navigate("/zonas");
      }, 1500);

      //navigate("/especies");
    } catch (error) {
      setError("Error al guardar la zona");
      setToastVariant("danger");
      setToastMsg("Error al guardar la zona");
      setShowToast(true);
    }
  };

  return (
    <Layout role={role}>
      <h2 className="mb-4">{params.id ? "Editar" : "Nueva"} Zona</h2>

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
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              placeholder="Ingrese el nombre de la zona"
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

          <Form.Group className="mb-3">
            <Form.Label>Extención</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Extención de la zona"
              {...register("extencion", {
                maxLength: {
                  value: 200,
                  message: "Máximo 200 caracteres",
                },
              })}
              isInvalid={errors.extencion}
            />
            <Form.Control.Feedback type="invalid">
              {errors.extencion?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex gap-2">
            <Button
              type="submit"
              className="cursor-pointer font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar Zona"}
            </Button>
            <Button
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

export default ZonaForm;
