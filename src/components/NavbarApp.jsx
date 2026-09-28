import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarApp = () => {
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
            as={Link}
            to="/"
          >
            Cerrar sesión
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarApp;
