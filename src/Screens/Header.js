import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "../Css/Header.css";

function Header(props) {
    return (
        // className='position-fixed fixed-top' to add in navbar
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
                <Container>
                    <Link to="/" className='text-decoration-none text-muted'>
                        <Navbar.Brand>
                            TATA IPL
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-center basic-navbar-nav'>
                        <Nav className="ml-auto Header__options">
                            <Nav.Link href="/">MATCHES</Nav.Link>
                            <Nav.Link href="/ipl-team-point">POINT TABLE</Nav.Link>
                            <Nav.Link href="/get-ipl-Teams">TEAMS</Nav.Link>
                            <Nav.Link href="/ipl-news">NEWS</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
}

export default Header;