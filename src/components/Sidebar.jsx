// con roles

import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = ({ role }) => {
  return (
    <Nav className="flex-column">
      <Nav.Link
        as={Link}
        to="/dashboard"
      >
        Dashboard
      </Nav.Link>

      {role === "admin" && (
        <>
          <Nav.Link
            as={Link}
            to="/especies"
          >
            Especies
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/habitats"
          >
            Hábitats
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/zonas"
          >
            Zonas
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/itinerarios"
          >
            Itinerarios
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/guias"
          >
            Guías
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/cuidadores"
          >
            Cuidadores
          </Nav.Link>

          {/* CuidadorEspecie */}
          <Nav.Link
            as={Link}
            to="/asignaciones"
          >
            Asignaciones
          </Nav.Link>
        </>
      )}

      {role === "guia" && (
        <Nav.Link
          as={Link}
          to="/mis-itinerarios"
        >
          Mis Itinerarios
        </Nav.Link>
      )}

      {role === "cuidador" && (
        <Nav.Link
          as={Link}
          to="/mis-especies"
        >
          Mis Especies
        </Nav.Link>
      )}
    </Nav>
  );
};

export default Sidebar;
