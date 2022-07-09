import React from 'react';
import toast from 'react-hot-toast';
import { HiOutlineArrowRight } from 'react-icons/hi'
import { isValidEmail } from '../helpers/algorithm';
import error from '../helpers/en.json';
import { newsLatter } from '../utils/action';
import Link from 'next/link';
import { setAuthorizationToken } from '../utils/services';
import { SocialIcon } from 'react-social-icons';
import FloatingWhatsApp from 'react-floating-whatsapp'
const Footer = (props) => {
    const handleNewsLatter = async (e) => {
        e.preventDefault();
        const { email } = e.target.elements;
        if (isValidEmail(email.value)) {
            const data = ({ email: email.value });
            setAuthorizationToken(false);
            await newsLatter(data).then((response) => {
                if (response.success) {
                    toast.success(response.message);
                    document.getElementById('newsform').reset('')
                } else {
                    toast.error(response.message)
                }
            })
        } else {
            toast.error(error.enterValidEmail)
        }
    }
    return (
        <div className='container-fluid' style={{ padding: '15px' }}>
            <div className='container' style={{ padding: '15px' }}>
                <footer id="footer" className="footer-1">
                    <div className="main-footer widgets-dark typo-light">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-12 nemobma">
                                    <div className="widget subscribe no-box">
                                        {/* <h5 className="widget-title">Header Section<span></span></h5> */}
                                        <ul className='ulFooter'>
                                            <li style={{textAlign:'left'}}>
                                                <Link href='/'>
                                                   <img alt='Champbuddy Logo' className='img-fluid' src='/assets/images/logofooter1.svg' style={{width:'200px',padding:'0px 15px'}} />
                                                </Link>
                                                <address style={{textAlign:'left',padding:'15px',fontSize:'1rem',lineHeight:'normal'}}>
                                                    4th Floor , F2453 ,Near Vyapaar Kendra, Palam Vihar ,Gurgaon 122017
                                                </address>
                                            </li>
                                            {/* <li><Link href='/'>Link Two</Link></li>
                                            <li><Link href='/'>Link Three</Link></li>
                                            <li><Link href='/'>Link Four</Link></li> */}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-12" style={{padding:'5px 0px'}}>
                                    <div className="widget subscribe no-box">
                                        <h5 className="widget-title">Company<span></span></h5>
                                        <ul className='ulFooter'>
                                            <li><Link href='/#why-champbuddy'>Why ChampBuddy</Link></li>
                                            {/* <li><a href='/products/personalised-assessment'>Assessment</a></li>
                                            <li><a href='/products/campus-hook'>Campus Hook</a></li> */}
                                            <li><a href='/our-team'>Our Team</a></li>
                                            <li><a href='/about-us'>About Us</a></li>
                                            <li><a href='/contact-us'>Contact Us</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-12" style={{padding:'5px 0px'}}>
                                    <div className="widget subscribe no-box">
                                        <h5 className="widget-title">Useful links<span></span></h5>
                                        <ul className='ulFooter'>
                                            {/* <li><Link href='/#get-in-touch'>Get In Touch</Link></li> */}
                                            <li><Link href='/terms-of-use'>Terms of Use</Link></li>
                                            <li><Link href='/privacy-policy'>Privacy Policy</Link></li>
                                            <li><Link href='/reward-policy'>Reward Policy</Link></li>
                                           
                                            {/* <li><Link href='/'>Link Three</Link></li>
                                            <li><Link href='/'>Link Four</Link></li> */}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-12" style={{padding:'5px 0px'}}>
                                    <div className="widget subscribe no-box">
                                        <h5 className="widget-title">Fancy a cool newsletter?<span></span></h5>
                                        <form id='newsform' style={{ padding: '0px 0px' }} onSubmit={(e) => handleNewsLatter(e)}>
                                            <div className='row justify-content-left expandNow' style={{ width: '100%', margin: '0px' }}>
                                                <div className='col-lg-10 col-12 formInner' style={{ padding: '0px', margin: '15px 0px' }}>
                                                    <input type='email' placeholder='Enter your email' name='email' id='email' required />
                                                </div>
                                                <div className='col-lg-2 col-12 formInner' style={{ padding: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5px 0px' }}>
                                                    <button title='submit' type='submit' className='vcbtn2 mobileBtn1' style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', lineHeight: 'normal', margin: '0px', padding: '0px', width: '100%', height: '45px' }}><HiOutlineArrowRight style={{ width: '25px', height: '25px' }} /></button>
                                                </div>
                                            </div>
                                        </form>
                                        <div className='socialLinking' style={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',height:'auto'}}>
                                            <SocialIcon target='_blank' network='pinterest' url='https://in.pinterest.com/champbuddyofficial/_saved/'/>&nbsp;
                                            <SocialIcon target='_blank' network='youtube' url='https://www.youtube.com/channel/UCKC1z4w5G4w1cUd-KZl2PWw'/>&nbsp;
                                            <SocialIcon target='_blank' network='twitter' url='https://twitter.com/champpbuddy'/>&nbsp;
                                            <SocialIcon target='_blank' network='facebook' url='https://www.facebook.com/officialchampbuddy/'/>&nbsp;
                                            <SocialIcon target='_blank' network='instagram' url='https://www.instagram.com/champ.buddy.official/'/>&nbsp;
                                            <SocialIcon target='_blank' network='linkedin' url='https://www.linkedin.com/company/80219598'/>&nbsp;
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row justify-content-center' style={{padding:'15px',paddingBottom:'0px',margin:'0px',alignItems:'center',justifyContent:'center',display:'flex',flexDirection:'column'}}>
                                <p style={{width:'100%',height:'100%',margin:'0px',textAlign:'center',fontSize:'0.9rem',fontWeight:'550',fontFamily:'Montserrat'}}>Copyright © {new Date().getFullYear()} ChampBuddy | All rights reserved</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            <div style={{width:'70px',height:'70px',position:'fixed',zIndex:'9999',right:'15px',bottom:'15px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <SocialIcon target='_blank' network='whatsapp' url='https://api.whatsapp.com/send?phone=919899122806'/>&nbsp;
            </div>
        </div>
    )
}
export default Footer;