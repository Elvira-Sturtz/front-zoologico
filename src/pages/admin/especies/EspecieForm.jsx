import { useEffect, useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../../components/Layout";
import CustomToast from "../../../components/CustomToast";
import {
  createEspecie,
  getEspecie,
  updateEspecie,
} from "../../../api/especies";

const EspecieForm = () => {
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
    const cargarEspecie = async () => {
      if (params.id) {
        try {
          setLoading(true);
          const res = await getEspecie(params.id);

          reset({
            nombre: res.data.nombre || "",
            nombreCientifico: res.data.nombreCientifico || "",
            descripcion: res.data.descripcion || "",
          });
        } catch (err) {
          setError("Error al cargar la especie");
        } finally {
          setLoading(false);
        }

        // setValue("nombre", res.data.nombre);
        // setValue("nombreCientifico", res.data.nombreCientifico);
        // setValue("descripcion", res.data.descripcion);
      }
    };

    cargarEspecie();
  }, [params.id, reset]);

  // Guardar datos
  const onSubmit = async (data) => {
    setError("");
    try {
      if (params.id) {
        await updateEspecie(params.id, data);
        setToastMsg("Especie actualizada correctamente");
      } else {
        await createEspecie(data);

        setToastVariant("success");

        setToastMsg("Especie creada correctamente");
      }
      setShowToast(true);

      setTimeout(() => {
        navigate("/especies");
      }, 1500);

      //navigate("/especies");
    } catch (error) {
      setError("Error al guardar la especie");
      setToastVariant("danger");
      setToastMsg("Error al guardar la especie");
      setShowToast(true);
    }
  };

  return (
    <Layout role={role}>
      <h2 className="mb-4">{params.id ? "Editar" : "Nueva"} Especie</h2>

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
            <Form.Label>Nombre Científico</Form.Label>
            <Form.Control
              placeholder="Ej: Panthera leo"
              {...register("nombreCientifico")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Descripción de la especie"
              {...register("descripcion", {
                maxLength: {
                  value: 200,
                  message: "Máximo 200 caracteres",
                },
              })}
              isInvalid={errors.descripcion}
            />
            <Form.Control.Feedback type="invalid">
              {errors.descripcion?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex gap-2">
            <Button
              type="submit"
              className="cursor-pointer font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar Especie"}
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

export default EspecieForm;
