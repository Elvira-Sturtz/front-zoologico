import { Card } from "react-bootstrap";

const CardResumen = ({ titulo, valor }) => {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text style={{ fontSize: "24px" }}>{valor}</Card.Text>
        <Card.Text>{valor}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardResumen;
