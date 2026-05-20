import { Card, Row, Col } from "react-bootstrap";
import Layout from "../components/Layout";
import CardResumen from "../components/CardResumen";

const Dashboard = ({ role }) => {
  // const role = localStorage.getItem("role");
  return (
    <Layout role={role}>
      <h2>Dashboard</h2>

      {role === "admin" && (
        <Row className="mt-4">
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Especies</Card.Title>
                <Card.Text>120</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Hábitats</Card.Title>
                <Card.Text>15</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <CardResumen
              titulo="Zonas"
              valor="5"
            />
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Itinerarios</Card.Title>
                <Card.Text>8</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <CardResumen
              titulo="Guías"
              valor="4"
            />
          </Col>
          <Col md={3}>
            <CardResumen
              titulo="Cuidadores"
              valor="10"
            />
          </Col>
        </Row>
      )}

      {role === "guia" && (
        <div className="mt-4">
          <h4>Mis Itinerarios asignados</h4>
          <p>Acá vas a ver tus recorridos asignados</p>
        </div>
      )}

      {role === "cuidador" && (
        <div className="mt-4">
          <h4>Mis Especies asignadas</h4>
          <p>Acá vas a ver las especies que cuidás</p>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
