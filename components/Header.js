import React, { useEffect, useState } from 'react';
import { Navbar, Container, Offcanvas, Nav, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router'
import { isLogin, isProfile } from '../middleware/auth';
import {IoLogOutOutline} from 'react-icons/io5'

const Header = () => {
    const router = useRouter();
    const [isActive, setIsActive] = useState('');
    const [profile, setProfile] = useState('');
    useEffect(() => {
        setIsActive(isLogin())
        isProfile().then((response) => setProfile(response))
    }, [])
    return (
        <header style={{ zIndex: '99999', margin: '0px', padding: '15px 0px', position: 'sticky', width: '100%' }}>
            {/*Bottom navbar for desktop */}
            <Navbar bg="light" expand="lg" fixed='top' className='desktop'>
                <Container>
                    <Navbar.Brand href="/"><img alt='Nordsta Logo' src='/assets/images/Nordsta.svg' width='100' height='30' className='img-fluid' /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto navanchor" style={{ width: '100%', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
        
                            {/* <Nav.Link href="/learning-aids">Learning aids</Nav.Link>
                            <Nav.Link href="/quiz">Quiz</Nav.Link> */}
                            {
                                isActive ?
                                        <NavDropdown title={
                                            profile && profile?.firstName ? (profile?.firstName[0] + profile?.lastName[0]).toUpperCase():'NA'
                                        } className='vcbtn4 iconsBg' id="basic-nav-dropdown">
                                            <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                                 <div className='vcbtn4 iconsSet applystyle' style={{width:'45px',height:'45px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                    {profile && profile?.firstName ? (profile?.firstName[0] + profile?.lastName[0]).toUpperCase():null}
                                                 </div>
                                                 <div className='applystyle2' style={{width:'80%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                     <h5>
                                                         {
                                                            profile && profile?.firstName ?
                                                                profile?.firstName + ' ' + profile?.lastName
                                                             : null
                                                         }
                                                     </h5>
                                                     <h6>
                                                         {
                                                             profile && profile?.email?
                                                             profile?.email
                                                             :null
                                                         }
                                                     </h6>
                                                 </div>
                                            </div>
                                            <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',borderTop:'solid #D9D9D9 2px',borderBottom:'solid #D9D9D9 2px',padding:'0px 0px',margin:'0px 0px',marginTop:'15px',flexDirection:'column'}}>
                                                <NavDropdown.Item href="/dashboard/profile">Profile</NavDropdown.Item>
                                                <NavDropdown.Item href="/dashboard/product-history">Product History</NavDropdown.Item>
                                                <NavDropdown.Item href="/dashboard/events">Events</NavDropdown.Item>
                                            </div>
                                            <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',borderBottom:'solid #D9D9D9 2px',padding:'0px 0px',margin:'0px 0px',flexDirection:'column'}}>
                                                <NavDropdown.Item href="/privacy-policy">Privacy Policy</NavDropdown.Item>
                                                <NavDropdown.Item href="/contact-us">Contact Us</NavDropdown.Item>
                                            </div>
                                            <NavDropdown.Item
                                                href={process.env.API_URL+'users/logout'}
                                                // onClick={() => {
                                                //    userLogout()
                                                // }}
                                            style={{display:'flex',alignItems:'center'}}><IoLogOutOutline style={{color:'#FB8500', width:'20px',height:'20px'}}/>&nbsp;Logout</NavDropdown.Item>
                                        </NavDropdown>
                                :
                                <Nav.Link className='vcbtn1' onClick={() => {
                                    //window.open('/sign-up', '_self')
                                    router.push('/sign-up', undefined, { shallow: true })
                                }}>Sign Up</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/*Bottom navbar for mobile */}
            <Navbar bg="light" expand={false} fixed='top' className='mobile'>
                <Container fluid>
                    <Navbar.Brand href="/" style={{ padding: '15px' }}><img alt='Nordsta Logo' src='/assets/images/Nordsta.svg' className='img-fluid' width='100' height='40' /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            {
                                profile?.firstName ?
                                    <Offcanvas.Title id="offcanvasNavbarLabel">
                                        <Nav.Link className='vcbtn4 iconsSet' style={{ marginRight: '15px'}}>
                                            {
                                                profile?.firstName ?
                                                    (profile?.firstName[0] + profile?.lastName[0]).toUpperCase()
                                                    : ''
                                            }
                                        </Nav.Link>
                                        <div className='applystyle2' style={{width:'80%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                     <h5 style={{fontSize:'16px'}}>
                                                         {
                                                            profile && profile?.firstName ?
                                                                profile?.firstName + ' ' + profile?.lastName
                                                             : null
                                                         }
                                                     </h5>
                                                     <h6 style={{fontSize:'14px'}}>
                                                         {
                                                             profile && profile?.email?
                                                             profile?.email
                                                             :null
                                                         }
                                                     </h6>
                                        </div>
                                    </Offcanvas.Title>
                                    : null
                            }
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3 navanchor">
                                {
                                    isActive ?
                                        <>
                                            <Nav.Link href="/dashboard/profile">Profile</Nav.Link>
                                            <Nav.Link href="/dashboard/product-history">Product History</Nav.Link>
                                            <Nav.Link href="/dashboard/events">Events</Nav.Link>
                                        </>
                                    :null
                                }
                               
                                {/* <Nav.Link href="/learning-aids">Learning aids</Nav.Link>
                                <Nav.Link href="/quiz">Quiz</Nav.Link> */}
                                {
                                    isActive ?
                                        <>
                                            <Nav.Link href="/privacy-policy">Privacy Policy</Nav.Link>
                                            <Nav.Link href="/contact-us">Contact Us</Nav.Link>
                                        </>
                                    :null
                                }
                                {
                                    isActive ?
                                        <Nav.Link className='vcbtn1' style={{marginTop:'15px'}}  href={process.env.API_URL+'users/logout'}
                                        // onClick={() => {
                                            // userLogout()
                                        // }}
                                        ><IoLogOutOutline style={{color:'#ffffff', width:'20px',height:'20px'}}/>&nbsp;Logout</Nav.Link>
                                        :
                                        <Nav.Link className='vcbtn1' style={{marginTop:'15px'}} onClick={() => {
                                            //window.open('/sign-up', '_self')
                                            router.push('/sign-up', undefined, { shallow: true })
                                        }}>Sign Up</Nav.Link>
                                }
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    )
}
export default Header;