import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {MdOutlineArrowForwardIos} from 'react-icons/md';
const NormalHeader = (props) => {
    return (
        <header style={{ zIndex: '99999', margin: '0px', padding: '15px 0px', position: 'sticky', width: '100%' }}>
            <Navbar bg="light" expand="lg" fixed='top'>
                <Container className='mobileFlex'>
                    <Navbar.Brand href="/" className='titleBrand'><img alt='Nordsta Logo' src='/assets/images/champbuddy.png' />{props?.title?props?.title:''}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{display:'none'}}/>
                    <Navbar.Collapse id="basic-navbar-nav" className='defaultShow'>
                        <Nav className="me-auto navanchor" style={{ width: '100%', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                            <Nav.Link href="/" className='newHome' style={{color:'#0603AF'}}>Homepage<MdOutlineArrowForwardIos/></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
export default NormalHeader;