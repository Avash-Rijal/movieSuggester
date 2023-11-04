import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import TheNavBar from "../Components/TheNavBar";
import { Button, Container, Modal } from "react-bootstrap";

const Profile = () => {
  const history = useHistory();

  const [userDetails, setUserDetails] = useState({});

  const [modalText, setModalText] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [logoutModal, setLogoutModal] = useState(false);

  const getAccessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        }
      );

      setUserDetails(response.data.data);
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

  const onLogout = () => {
    setLogoutModal(true);
  };
  return (
    <>
      <TheNavBar></TheNavBar>
      <Container>
        <br />
        <Link to="/">Home</Link>
        <br />
        <br />
        Name: {userDetails.name}
        <br />
        Email: {userDetails.email}
        <br />
        Country: {userDetails.country}
        <br />
        <br />
        <Button onClick={onLogout} className="text-light" variant="dark">
          Logout
        </Button>
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

      <Modal
        show={logoutModal}
        onHide={() => {
          setLogoutModal(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you sure you want to Logout?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setLogoutModal(false);
            }}
          >
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem("accessToken");
              history.push("/");
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
