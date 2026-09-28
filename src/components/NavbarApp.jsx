import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavbarApp = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/dashboard"
        >
          Zoológico
        </Navbar.Brand>

        <Nav>
          <Nav.Link
            as={Link}
            to="/dashboard"
          >
            Zoo App
          </Nav.Link>

          <Nav.Link
            as="button"
            onClick={handleLogout}
            className="border-0 bg-transparent"
          >
            Cerrar sesión
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarApp;
