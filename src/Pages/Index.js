import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import TheNavBar from "../Components/TheNavBar";
import SingleMovie from "../Components/SingleMovie";
import { Container, Form, Row, Spinner } from "react-bootstrap";

const Index = () => {
  const [movies, setMovies] = useState([]);

  const [isError, setIsError] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const [movieSearch, setMovieSearch] = useState("");

  const [movieSearchError, setMovieSearchError] = useState("");

  const [loading, setLoading] = useState(false);

  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (!firstRun) {
      const fetchTimer = setTimeout(() => {
        if (movieSearch && movieSearch.length > 2) {
          fetchMovies();
        } else if (movieSearch.length < 1) {
          fetchMovies();
        } else {
          setMovieSearchError("Please enter at least 3 characters.");
        }
      }, 800);

      return () => {
        clearTimeout(fetchTimer);
      };
    }
  }, [movieSearch]);

  const fetchMovies = async () => {
    setLoading(true);
    setMovieSearchError("");
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${movieSearch}`
      );
      setMovies(response.data.moviesData);
      setIsError(false);
      setLoading(false);
      setFirstRun(false);
    } catch (error) {
      setIsError(true);
      setErrorMsg("Couldn't find the data");
      setLoading(false);
      setFirstRun(false);
    }
  };
  return (
    <>
      <TheNavBar></TheNavBar>
      <Container>
        <div className="text-center mt-2 mb-2">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Search"
              value={movieSearch}
              onChange={(e) => setMovieSearch(e.target.value)}
            />
          </Form.Group>
        </div>
      </Container>

      <span style={{ color: "red" }}>{movieSearchError}</span>
      {isError ? (
        <>
          <div
            style={{
              background: "red",
              padding: "10px",
              margin: "5px",
              color: "white",
            }}
          >
            {errorMsg}
          </div>
        </>
      ) : (
        <>
          <div
            style={{ background: "#e7e7e7", padding: "10px", margin: "5px" }}
          >
            {loading ? (
              <>
                <Container className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </Container>
              </>
            ) : (
              <></>
            )}
            {!loading && movies.length < 1 ? (
              <>No movies found.</>
            ) : (
              <>
                <Row>
                  {movies.map((el) => (
                    <SingleMovie data={el}></SingleMovie>
                  ))}
                </Row>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Index;
