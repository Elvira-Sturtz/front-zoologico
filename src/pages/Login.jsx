import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form.email, form.password);

      // redirección según rol
      const user = JSON.parse(localStorage.getItem("user"));

      if (user.role === "admin") navigate("/especies");
      else if (user.role === "guia") navigate("/mis-itinerarios");
      else if (user.role === "cuidador") navigate("/mis-especies");
    } catch {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={onSubmit}>
        <Form.Control
          className="mb-3"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <Button
          className="mt-3"
          type="submit"
        >
          Iniciar sesión
        </Button>
      </Form>
    </div>
  );
};

export default Login;
