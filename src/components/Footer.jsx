import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Footer() {
  return (
    
    <>
    
    <Navbar expand="xl" bg="dark" variant="dark" fixed="bottom" collapseOnSelect>
      <Container>
        <Navbar.Brand href="#home">GROUP 5</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Test <a href="#login">GitHub</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    
    </>





  )
}

export default Footer