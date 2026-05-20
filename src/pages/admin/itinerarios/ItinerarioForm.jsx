import { useEffect, useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../../components/Layout";
import CustomToast from "../../../components/CustomToast";
import {
  createItinerario,
  getItinerario,
  updateItinerario,
} from "../../../api/itinerarios";

const ItinerarioForm = () => {
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
    navigate("/especies");
  };

  // Cargar datos si es edición
  useEffect(() => {
    const cargarItinerario = async () => {
      if (params.id) {
        try {
          setLoading(true);
          const res = await getItinerario(params.id);

          reset({
            codigo: res.data.codigo || "",
            duracion: res.data.duracion || "",
            longitud: res.data.longitud || "",
            maxVisitntes: res.data.maxVisitntes || "",
          });
        } catch (err) {
          setError("Error al cargar el itinerario");
        } finally {
          setLoading(false);
        }

        // setValue("nombre", res.data.nombre);
        // setValue("nombreCientifico", res.data.nombreCientifico);
        // setValue("descripcion", res.data.descripcion);
      }
    };

    cargarItinerario();
  }, [params.id, reset]);

  // Guardar datos
  const onSubmit = async (data) => {
    setError("");
    try {
      if (params.id) {
        await updateItinerario(params.id, data);
        setToastMsg("Itinerario actualizado correctamente");
      } else {
        await createItinerario(data);

        setToastVariant("success");

        setToastMsg("Itinerario creado correctamente");
      }
      setShowToast(true);

      setTimeout(() => {
        navigate("/itinerarios");
      }, 1500);

      //navigate("/especies");
    } catch (error) {
      setError("Error al guardar el itinerario");
      setToastVariant("danger");
      setToastMsg("Error al guardar el itinerario");
      setShowToast(true);
    }
  };

  return (
    <Layout role={role}>
      <h2 className="mb-4">{params.id ? "Editar" : "Nuevo"} Itinerario</h2>

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
            <Form.Label>Código de Itinerario</Form.Label>
            <Form.Control
              placeholder="Ingrese el codigo identificatorio"
              {...register("codigo", {
                required: "El codigo es obligatorio",
                minLength: {
                  value: 3,
                  message: "Mínimo 3 caracteres",
                },
              })}
              isInvalid={errors.codigo}
            />
            <Form.Control.Feedback type="invalid">
              {errors.codigo?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Duración del Recorrido</Form.Label>
            <Form.Control
              placeholder="Ej: 30 minutos"
              {...register("duracion")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Longitud del Itinerario</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Longitud del Itinerario"
              {...register("longitud", {
                maxLength: {
                  value: 200,
                  message: "Máximo 200 caracteres",
                },
              })}
              isInvalid={errors.longitud}
            />
            <Form.Control.Feedback type="invalid">
              {errors.longitud?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Máximo número de Visitantes Autorizado</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Número máximo de visitantes autorizado"
              {...register("maxVisitantes", {
                maxLength: {
                  value: 200,
                  message: "Máximo 200 caracteres",
                },
              })}
              isInvalid={errors.maxVisitantes}
            />
            <Form.Control.Feedback type="invalid">
              {errors.maxVisitantes?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button
              type="submit"
              className="cursor-pointer font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar Itinerario"}
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

export default ItinerarioForm;
