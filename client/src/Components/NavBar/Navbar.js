import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../assets/images/logo.png";

function NavbarPage() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={Logo}
            width="60"
            height="60"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/subject">Subjects</Nav.Link>
            <Nav.Link href="#features">Classrooms</Nav.Link>
            <NavDropdown title="Teacher" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Add Teacher
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Teacher List
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Student" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Add Student
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Student List
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#pricing">Allocate Classroom</Nav.Link>
            <Nav.Link href="#pricing">Allocate Subjects</Nav.Link>
            <Nav.Link href="#pricing">Student Report</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPage;
