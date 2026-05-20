import { useEffect, useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../../components/Layout";
import CustomToast from "../../../components/CustomToast";
import {
  createHabitat,
  getHabitat,
  updateHabitat,
} from "../../../api/habitats";

const HabitatForm = () => {
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
    navigate("/habitats");
  };

  // Cargar datos si es edición
  useEffect(() => {
    const cargarHabitat = async () => {
      if (params.id) {
        try {
          setLoading(true);
          const res = await getHabitat(params.id);

          reset({
            nombre: res.data.nombre || "",
            clima: res.data.clima || "",
            vegetacion: res.data.vegetacion || "",
            continentes: res.data.continentes || "",
          });
        } catch (err) {
          setError("Error al cargar el habitat");
        } finally {
          setLoading(false);
        }

        // setValue("nombre", res.data.nombre);
        // setValue("nombreCientifico", res.data.nombreCientifico);
        // setValue("descripcion", res.data.descripcion);
      }
    };

    cargarHabitat();
  }, [params.id, reset]);

  // Guardar datos
  const onSubmit = async (data) => {
    setError("");
    try {
      if (params.id) {
        await updateHabitat(params.id, data);
        setToastMsg("Habitat actualizada correctamente");
      } else {
        await createHabitat(data);

        setToastVariant("success");

        setToastMsg("Habitat creada correctamente");
      }
      setShowToast(true);

      setTimeout(() => {
        navigate("/habitats");
      }, 1500);

      //navigate("/especies");
    } catch (error) {
      setError("Error al guardar el habitat");
      setToastVariant("danger");
      setToastMsg("Error al guardar el habitat");
      setShowToast(true);
    }
  };

  return (
    <Layout role={role}>
      <h2 className="mb-4">{params.id ? "Editar" : "Nueva"} Habitat</h2>

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
              placeholder="Ingrese el nombre en español"
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
            <Form.Label>Clima</Form.Label>
            <Form.Control
              placeholder="Ej: Tropical"
              {...register("clima")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Vegetacion</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Vegetacion del habitat"
              {...register("vegetacion", {
                maxLength: {
                  value: 200,
                  message: "Máximo 200 caracteres",
                },
              })}
              isInvalid={errors.vegetacion}
            />
            <Form.Control.Feedback type="invalid">
              {errors.vegetacion?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Continentes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Continentes del habitat"
              {...register("continentes", {
                maxLength: {
                  value: 200,
                  message: "Máximo 200 caracteres",
                },
              })}
              isInvalid={errors.continentes}
            />
            <Form.Control.Feedback type="invalid">
              {errors.continentes?.message}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Me gustaria que se pudiera/n selecionar el/los continente/s como si fuera opciones */}
          <div className="d-flex gap-2">
            <Button
              type="submit"
              className="cursor-pointer font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar Continente/s"}
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

export default HabitatForm;
