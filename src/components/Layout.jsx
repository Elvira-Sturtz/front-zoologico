//Este componente envuelve TODAS las vistas después del login.
import { Container, Row, Col } from "react-bootstrap";
import NavbarApp from "./NavbarApp";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { user } = useAuth();
  console.log("USUARIO:", user);

  return (
    <>
      <NavbarApp />

      <Container fluid>
        <Row>
          <Col
            md={2}
            className="bg-light  p-3"
          >
            <Sidebar role={user?.rol} />
          </Col>

          <Col
            md={10}
            className="p-4"
          >
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
