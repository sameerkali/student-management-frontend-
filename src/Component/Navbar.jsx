import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';



function Header() {
  const [token, setToken] = useState("")
  const [click, setClick ] = useState(true)
  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  },[click])
  // useEffect(()=>{
  //   setClick(a => !a)
  // },)
  const navigate = useNavigate(); 
  const clearLocalStorage  =()=>{
    localStorage.clear("token")
    localStorage.removeItem('role');
    navigate("login")
    setClick(a => !a)

  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {token && 
            <Button onClick={clearLocalStorage}>Logout</Button>
           }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;