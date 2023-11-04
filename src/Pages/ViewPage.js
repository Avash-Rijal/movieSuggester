import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TheNavBar from "../Components/TheNavBar";
import { Button, Card, Container, Modal } from "react-bootstrap";

const ViewPage = () => {
  const getParams = useParams();
  const getId = getParams.id;

  const [movieDetails, setMovieDetails] = useState({});

  const [modalText, setModalText] = useState("");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getId}`
      );
      setMovieDetails(response.data.singleMovieData);
    } catch (error) {
      setModalText("Couldn't fetch the request.");
      setShowModal(true);
    }
  };

  return (
    <>
      <TheNavBar></TheNavBar>
      <Container>
        <br />
        <h3 className="text-info">{movieDetails.name}</h3>
        <br />
        <h5>Information:</h5>
        Information: {movieDetails.info}
        <br />
        <br />
        <Card body>{movieDetails.desc}</Card>
        <br />
        <h5>Image:</h5>
        <img src={movieDetails.image} alt="MoviePoster" height={"200px"} />
        <br />
        <br />
        <Card body>Rating: {movieDetails.rating}</Card>
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

export default ViewPage;
