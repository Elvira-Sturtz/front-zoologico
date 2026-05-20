//Este componente envuelve TODAS las vistas después del login.
import { Container, Row, Col } from "react-bootstrap";
import NavbarApp from "./NavbarApp";
import Sidebar from "./Sidebar";

const Layout = ({ children, role }) => {
  return (
    <>
      <NavbarApp />

      <Container fluid>
        <Row>
          <Col
            md={2}
            className="bg-light vh-100 p-3"
          >
            <Sidebar role={role} />
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
