import React, { useState, useEffect } from "react";
import { CgCloseO } from 'react-icons/cg';
import { useRouter } from 'next/router';
import OtpInput from 'react-otp-input';
import toast from 'react-hot-toast';
import error from '../../helpers/en.json';
import 'react-phone-input-2/lib/style.css'
import { getSessionStorage, setSession, removeSession, getLocalStorage, removeLocalStorage, setCookies } from "../../middleware/storage";
import {sendOtp, formSubmit} from "../../utils/action";
import { setAuthorizationToken } from "../../utils/services";
const ModelOTP = (props) => {
     const router = useRouter();
     const [mobile, setMobile] = useState('');
     const [key, setKey] = useState('');
     const [time, setTimerValue] = useState('00:00');
     const [OTP, setOTP] = useState("");
     const [isShow, setIsShow] = useState(true);
     const [isNewuser, setIsNewUser]= useState(false);
     const [isError, setIsError] = useState('');
     const startTimer = (duration) => {
          var timer = duration, minutes, seconds;
          const stop = setInterval(function () {
               minutes = parseInt(timer / 60, 10);
               seconds = parseInt(timer % 60, 10);
               minutes = minutes < 10 ? "0" + minutes : minutes;
               seconds = seconds < 10 ? "0" + seconds : seconds;
               setTimerValue("");
               setTimerValue(minutes + " : " + seconds);
               if (--timer < 0) {
                    clearInterval(stop);
                    setIsShow(false)
               }
          }, 1000);
     };
     const handleOTPGet = async (e) => {
          e.preventDefault();
          let path = '';
          if(getLocalStorage('redirect') && getLocalStorage('redirect').status === 301){
               path = getLocalStorage('redirect').path;
          }
          if (OTP?.length < 6) {
               toast.error(error.enterValidOtp, {
                    duration: 2000,
               })
               return 0;
          }
          const data = {
               "check": '+' + mobile,
               "verification_key": key,
               "otp": OTP,
               "sUrl":isNewuser?"profile":path?path:'otp-verify',
               "fUrl":"otp-verify",
          }
          setCookies('d ' ,JSON.stringify(data))
          if(isNewuser)
          {
               await formSubmit('auth/register', 'POST', data);
          }else{
               await formSubmit('auth/login', 'POST', data);
          }
     }

     const handleResend = async () => {
          const data = {
               mobile: '+' + mobile,
               type: "RESEND"
          }
          await sendOtp(data).then((response) => {
               if (response.success) {
                    setSession('_initA', { mobile: mobile, key: response.data });
                    setMobile(mobile);
                    setKey(response.data);
                    setIsShow(true)
                    startTimer(60);
                    toast.success(response.message, {
                         duration: 2000,
                    })
               } else {
                    toast.error(response.message, {
                         duration: 2000,
                    })
               }
          })
     }
     useEffect(() => {
          setAuthorizationToken(false)
          let previousData = getSessionStorage('_initA');
          if (previousData) {
               setMobile(previousData?.mobile)
               setKey(previousData.key);
               setIsNewUser(previousData?.isProfile)
          } else {
               removeSession('_initA')
               //window.open('/', '_self')
               router.push('/', undefined, { shallow: true });
          }
          if(router?.query && router?.query.error)
          {
                 setIsError(router?.query.error)
                 router.replace(router.pathname, undefined, {shallow:true})
                 startTimer(1)
          }else{
               if(isError)
               {
                    startTimer(1)
               }else{
                    startTimer(60)
               }
          }
          return () => {
          };

     }, [router?.query?.error]);
     return (
          <>
               <div className="container-fluid reducepadd" style={{ height: '100%', padding: '15px', position: 'fixed', zIndex: '9999999999', top: '0px', background: 'rgb(255 255 255 / 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexDirection: 'column' }}>
                    <div className="container relativeBg reducepadd" style={{ width: '100%', maxWidth: '100%', position: 'absolute', top: '0px', padding: '15px', alignItems: 'center', justifyContent: 'flex-end', display: 'flex' }}>
                         <button className="closeIcons"
                              onClick={(e) => {
                                   if(isError)
                                   {
                                        router.back();
                                   }else{
                                        removeSession('_initA')
                                        //window.open('/', '_self')
                                        router.push('/', undefined, { shallow: true })
                                   }
                              }}
                         ><CgCloseO style={{ width: '30px', height: '30px', color: '#000000' }} /></button>
                    </div>
                    <div className="container fullHeight" style={{ padding: '15px', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', flexDirection: 'column' }}>
                         <div className="row justify-content-center rowFlex" style={{ width: '100%', height: '100%', margin: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <div className="col-xl-4 col-lg-4 col-md-5 col-12 desktop3 mobilehidenow" style={{ height: '100%', padding: '0px' }}>
                                   <img src='/assets/images/authbg.png' alt='banner' className="img-fluid heightReduce" style={{ width: '100%', height: '100%' }} />
                              </div>
                              <div className="col-xl-6 col-lg-6 col-md-7 col-12 flexSet" style={{ border: 'solid #ffffff 1px', background: '#ffffff', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                   <h1 className="modelh1">OTP Verification</h1>
                                   <h2 className="modelh2">Enter the OTP sent to <bold>xxxx{mobile?.substr(-4)}</bold></h2>
                                   <form style={{ width: '100%' }} onSubmit={(e)=>{handleOTPGet(e)}}>
                                        <div className="row justify-content-center" style={{ width: '100%', margin: '0px' }}>
                                             <div className="col-xl-7 col-lg-8 col-12" style={{ padding: '0px' }}>
                                                  <OtpInput
                                                       className="vcPhoneInp2"
                                                       value={OTP}
                                                       containerStyle={{
                                                            border: 'solid #707070 1px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            padding: '10px 5px'

                                                       }}
                                                       placeholder='......'
                                                       shouldAutoFocus={true}
                                                       onChange={(e)=>{
                                                            setOTP(e)
                                                            setIsError('');
                                                       }}
                                                       isInputNum={true}
                                                       isInputSecure={true}
                                                       numInputs={6}
                                                       separator={<span>&nbsp;</span>}
                                                  />
                                                  {
                                                       isError?
                                                            <label style={{width:'100%',textAlign:'center',lineHeight:'24px'}}><small style={{width:'100%',fontSize:'14px',fontWeight:'550',color:'#ff6666',fontFamily:'Montserrat'}}>{isError}!</small></label>
                                                       :null
                                                  }
                                             </div>
                                             <div className="col-xl-7 col-lg-8 col-12" style={{ padding: '15px 0px' }}>
                                                  <button type='submit' className='vcbtn2 mobileBtn1 mobileBtn4' style={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', lineHeight: 'normal', margin: '0px', padding: '0px 25px' }}>VERIFY</button>
                                             </div>
                                        </div>
                                   </form>
                                   <p className="modelp1" style={{ margin: '0px' }}>Did't received the OTP? <a style={{ color: '#0603AF', fontSize: '15px', fontWeight: '650',cursor:'pointer'}} onClick={(e) => {
                                        setIsError('')
                                        handleResend()
                                   }}>Resend Again</a></p>
                                   <label style={{ width: '100%', textAlign: 'center', lineHeight: 'normal', color: '#cecece', fontSize: '16px', fontWeight: '550', padding: '2px' }}>{isShow ? time : null}</label>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     )
}
export default ModelOTP;