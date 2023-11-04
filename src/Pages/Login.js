import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import TheNavBar from "../Components/TheNavBar";
import { Button, Container, Form, Modal } from "react-bootstrap";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const history = useHistory();

  const [modalText, setModalText] = useState("");

  const [showModal, setShowModal] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData,
        {
          timeout: 10000,
        }
      );
      let getAccessToken = response.data.accessToken;

      localStorage.setItem("accessToken", getAccessToken);

      if (response.data.status === "success") {
        setModalText("Logged in successfully! redirecting...");
        setShowModal(true);
      }

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
        <h3>Login Page</h3>
        <br />
        <form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={email} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={password}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Login
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

export default Login;
