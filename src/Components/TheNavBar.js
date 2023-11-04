import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const TheNavBar = () => {
  return (
    <>
      <Navbar className="bg-dark">
        <Container>
          <Navbar.Brand href="#home">
            <Link to="/" className="text-light">
              Movie Suggester
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end gap-5">
            <Navbar.Text>
              <Link to="/add" className="text-light">
                Add Movies
              </Link>
            </Navbar.Text>
            <Navbar.Text className="text-light">
              {localStorage.getItem("accessToken") ? (
                <>
                  <Link to="/profile" className="text-light">
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-light">
                    Login
                  </Link>
                </>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default TheNavBar;
