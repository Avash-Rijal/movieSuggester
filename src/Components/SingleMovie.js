import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SingleMovie = (props) => {
  return (
    <>
      <Col>
        <Card style={{ width: "18rem", minHeight: "750px" }}>
          <Card.Img variant="top" src={props.data.image} />
          <Card.Body>
            <Card.Title>{props.data.name}</Card.Title>
            <Card.Text>{props.data.info}</Card.Text>
            <Link to={`/view_page/${props.data.id}`}>
              <Button variant="dark">View Details</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default SingleMovie;
