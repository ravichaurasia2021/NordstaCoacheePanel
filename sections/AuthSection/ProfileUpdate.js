import React, { useState } from "react";
import {CgCloseO} from 'react-icons/cg';
import { useRouter } from 'next/router'
import toast from 'react-hot-toast';
import error from '../../helpers/en.json';
import 'react-phone-input-2/lib/style.css'
import { isValidEmail } from "../../helpers/algorithm";
import { updateProfileData } from "../../utils/action";
import { setAuthorizationToken } from "../../utils/services";
import { getLocalStorage, removeLocalStorage } from "../../middleware/storage";
const ProfileUpdate = (props) => {
     const router = useRouter();
     const handleUpdateProfile = async (e) => {
          e.preventDefault();
          const {firstname, lastname, email} = e.target.elements;
          if(isValidEmail(email.value))
          {
               const data = ({firstName: firstname.value, lastName:lastname.value, email:email.value,sUrl:'/', fUrl:'/sign-up'})
               setAuthorizationToken(true);
               await updateProfileData(data).then((response)=>{
                    if(response.success){
                         toast.success(response.message);
                         let path = '/';
                         if(getLocalStorage('redirect') && getLocalStorage('redirect').status === 301){
                              path = getLocalStorage('redirect').path;
                         }
                         removeLocalStorage('redirect')
                         //window.open(path, '_self')
                         router.push(path, undefined, {shallow:true});
                    }else{
                         toast.error(response.message)
                         //window.open('/sign-up', '_self')
                         router.push('/sign-up', undefined, {shallow:true});
                    }
               })
          }else{
               toast.error(error.enterValidEmail, {
                    duration: 2000,
               })
          }
     }
     return (
          <>
               <div className="container-fluid reducepadd" style={{ height: '100%', padding: '15px', position: 'fixed', zIndex: '9999999999', top: '0px', background: 'rgb(255 255 255 / 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',flexDirection:'column',overflowY:'auto'}}>
                    <div className="container relativeBg reducepadd addPadd" style={{width:'100%',maxWidth:'100%',position:'absolute',top:'0px',padding:'15px',alignItems:'center',justifyContent:'flex-end',display:'flex'}}>
                         <button className="closeIcons"
                            onClick={(e)=>{
                              //window.open('/', '_self')
                              router.push('/', undefined, {shallow:true})
                            }}
                         ><CgCloseO style={{width:'30px',height:'30px',color:'#000000'}}/></button>
                    </div>
                    <div className="container fullHeight" style={{ padding: '15px', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative',flexDirection:'column'}}>
                         <div className="row justify-content-center rowFlex" style={{ width: '100%', height: '100%', margin: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <div className="col-xl-4 col-lg-4 col-md-5 col-12 desktop3 mobilehidenow" style={{ height: '100%', padding: '0px' }}>
                                   <img src='/assets/images/authbg.png' className="img-fluid heightReduce heightReduce2" style={{ width: '100%', height: '100%' }} alt='banner'/>
                              </div>
                              <div className="col-xl-6 col-lg-6 col-md-7 col-12 flexSet" style={{ border: 'solid #ffffff 1px', background: '#ffffff', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                   <h1 className="modelh1" style={{color:'#0603AF'}}>Wellome Champs!</h1>
                                   <h2 className="modelh2">Enter your Profile details</h2>
                                   <form style={{ width: '100%' }} onSubmit={(e)=>{handleUpdateProfile(e)}}>
                                        <div className="row justify-content-center" style={{ width: '100%', margin: '0px' }}>
                                             <div className="col-xl-5 col-lg-5 col-md-6 col-12" style={{ padding: '15px'}}>
                                                  <input type='text' required={true} placeholder="First name" name='firstname' id='firstname' className="vcPhoneInp vcProInp" style={{textAlign:'left',paddingLeft:'0px',paddingRight:'0px'}} />
                                             </div>
                                             <div className="col-xl-5 col-lg-5 col-md-6 col-12" style={{ padding: '15px'}}>
                                                  <input type='text' required={true} placeholder='Last name' name='lastname' id='lastname' className="vcPhoneInp vcProInp" style={{textAlign:'left',paddingLeft:'0px',paddingRight:'0px'}} />
                                             </div>
                                             <div className="col-xl-10 col-lg-10 col-md-12 col-12" style={{ padding: '15px'}}>
                                                  <input type='email' required={true} placeholder='Email Id' name='email' id='email' className="vcPhoneInp vcProInp" style={{textAlign:'left',paddingLeft:'0px',paddingRight:'0px'}} />
                                             </div>
                                             <div className="col-xl-10 col-lg-10 col-md-12 col-12" style={{ padding: '15px 0px' }}>
                                                  <button type='submit' className='vcbtn2 mobileBtn1 mobileBtn4' style={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', lineHeight: 'normal', margin: '0px', padding: '0px 25px' }}>CONTINUE</button>
                                             </div>
                                        </div>
                                   </form>
                                   <p className="modelp1">By signing up, you agree to<br/>our <a href='/terms-of-use' style={{ color: '#0603AF', fontSize: '15px', fontWeight: '600',textDecoration:'none'}}>Terms of Use</a> and <a href='/privacy-policy' style={{ color: '#0603AF', fontSize: '15px', fontWeight: '600',textDecoration:'none'}}>Privacy Policy</a></p>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     )
}
export default ProfileUpdate;