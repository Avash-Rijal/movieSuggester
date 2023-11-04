import axios from "axios";
import { useRef, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import TheNavBar from "../Components/TheNavBar";

const AddMoviePage = () => {
  const history = useHistory();
  const movie_name_ref = useRef();
  const movie_rating_ref = useRef();
  const movie_description_ref = useRef();

  const [modalText, setModalText] = useState("");

  const [showModal, setShowModal] = useState(false);

  const addMovie = async (e) => {
    e.preventDefault();

    const movieData = {
      movie_name: movie_name_ref.current.value,
      rating: movie_rating_ref.current.value,
      description: movie_description_ref.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        {
          timeout: 10000,
        }
      );
      setModalText(response.data.message);
      setShowModal(true);

      setTimeout(() => {
        history.replace("/");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setModalText(error.response.data.errors[0].message);
        setShowModal(true);
      } else {
        setModalText("Unknown error occured!");
        setShowModal(true);
      }
    }
  };
  return (
    <>
      <TheNavBar></TheNavBar>
      <Container>
        <br />
        <Link to="/">Home</Link>
        <br />
        <br />
        <form onSubmit={addMovie}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Movie Name: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Movie Name"
              ref={movie_name_ref}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Movie Rating: </Form.Label>
            <Form.Control
              type="number"
              placeholder="Rating"
              ref={movie_rating_ref}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Movie Description: </Form.Label>
            <Form.Control as="textarea" rows={3} ref={movie_description_ref} />
          </Form.Group>
          <Button variant="dark" type="submit">
            Add Movie
          </Button>
        </form>
      </Container>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddMoviePage;
