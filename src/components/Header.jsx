import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/styles/Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Header() {
  return (

    <>
      
      <Navbar expand="xl" bg="myHeader" variant="dark" fixed="top" collapseOnSelect >
      <Container>
        <Navbar.Brand href="#home">Pouch</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse class="right-aligned">
          <Nav className="me-auto">
            <Nav.Link href="#home">Overview</Nav.Link>
            <Nav.Link href="#link">Transactions</Nav.Link>
            <Nav.Link href="#link">Documents</Nav.Link>
            <Button variant="success">Logout</Button>{' '}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>



  );
}

export default Header