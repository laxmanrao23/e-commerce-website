// Almost out of storage … If you run out, you can't create or edit files, send or receive emails on Gmail, or back up to Google Photos.
import { Outlet, Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { MDBIcon } from 'mdb-react-ui-kit';
import '../App.css'



const Layout = () => {

    function IslogIn(){
        console.log(localStorage.getItem("user_id"))
        if (localStorage.getItem("user_id") == null) {
            return (<Nav.Link href="/login">Login</Nav.Link>);
        }
        else {
            return(<Nav.Link href="/logout">Logout</Nav.Link>);
        }
    }

    function IsAdmin(){
        console.log(localStorage.getItem("user_id"))
        if (localStorage.getItem("user_id") == 6) {
            return (<>
                <Nav.Link href="/product">Product</Nav.Link>
                <Nav.Link href="/report">Report</Nav.Link>
            </>);
        }
        else {
            return(<Nav.Link href="/Ordpage">Orders</Nav.Link>);
        }
    }



    return (
        <>
        <Navbar bg="dark" variant="dark" expand='lg' sticky="top">
            <Container fluid >
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                <Navbar.Brand href="/" >TPC Tech Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ 
                        maxHeight: '100px',
                    }}
                    navbarScroll
                >
                    <Nav.Link href="/search">Home</Nav.Link>
                    <Nav.Link href="/cart">Cart</Nav.Link>
                    <IsAdmin/>
                    <IslogIn/>
                    
                    
                </Nav>
                {/* <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    <Outlet/>
    </>
    )
};

export default Layout;