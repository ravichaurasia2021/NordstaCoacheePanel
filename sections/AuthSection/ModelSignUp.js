import React, { useEffect, useState } from "react";
import PhoneInput from 'react-phone-input-2'
import { CgCloseO } from 'react-icons/cg';
import { useRouter } from 'next/router'
import toast from 'react-hot-toast';
import error from '../../helpers/en.json';
import 'react-phone-input-2/lib/style.css'
import { sendOtp } from "../../utils/action";
import { getSessionStorage, setSession, removeSession } from "../../middleware/storage";
import { setAuthorizationToken } from "../../utils/services";
const ModelSignUp = (props) => {
     const router = useRouter();
     const [mobile, setMobile] = useState('');
     const [countryName, setCountryName] = useState('in')
     const [countryCode, setCountryCode] = useState('91');
     const [isActive, setIsActive] = useState(false);
     const handleOTPGet = async (e) => {
          e.preventDefault();
          let countLength = mobile.replace(countryCode, '');
          setIsActive(true)
          setAuthorizationToken(false)
          if (countLength?.length === 10) {
               var data = {
                    mobile: '+' + mobile,
                    type: "VERIFICATION"
               }
               setAuthorizationToken(false)
               await sendOtp(data).then((response) => {
                    if (response.success) {
                         setSession('_initA', { mobile: mobile, key: response.data, isProfile: response?.newUser});
                         setIsActive(false)
                         //window.open('/otp-verify', '_self')
                         router.push('/otp-verify', undefined, { shallow: true })
                    } else {
                         toast.error(response.message, {
                              duration: 2000,
                         })
                         setIsActive(false)
                    }
               })
          } else {
               toast.error(error.enterValidMobile, {
                    duration: 2000,
               })
               setIsActive(false)
          }
     }
     useEffect(() => {
          setAuthorizationToken(false)
          let previous = getSessionStorage('_initA')
          if (previous) {
               setMobile(previous?.mobile)
               setIsActive(false)
          }
     }, [])
     return (
          <>
               <div className="container-fluid reducepadd" style={{ height: '100%', padding: '15px', position: 'fixed', zIndex: '9999999999', top: '0px', background: 'rgb(255 255 255 / 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexDirection: 'column' }}>
                    <div className="container relativeBg reducepadd" style={{ width: '100%', maxWidth: '100%', position: 'absolute', top: '0px', padding: '15px', alignItems: 'center', justifyContent: 'flex-end', display: 'flex' }}>
                         <button className="closeIcons"
                              onClick={(e) => {
                                   removeSession('_initA');
                                   router.back()
                              }}
                         ><CgCloseO style={{ width: '30px', height: '30px', color: '#000000' }} /></button>
                    </div>
                    <div className="container fullHeight" style={{ padding: '15px', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', flexDirection: 'column' }}>
                         <div className="row justify-content-center rowFlex" style={{ width: '100%', height: '100%', margin: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <div className="col-xl-4 col-lg-4 col-md-5 col-12 desktop3 mobilehidenow" style={{ height: '100%', padding: '0px' }}>
                                   <img alt='banner' src='/assets/images/authbg.png' className="img-fluid heightReduce" style={{ width: '100%', height: '100%' }}/>
                              </div>
                              <div className="col-xl-6 col-lg-6 col-md-7 col-12 flexSet" style={{ border: 'solid #ffffff 1px', background: '#ffffff', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                   <h1 className="modelh1">Sign In to your Account</h1>
                                   <h2 className="modelh2">Enter Mobile Number</h2>
                                   <form style={{ width: '100%' }} onSubmit={(e) => handleOTPGet(e)}>
                                        <div className="row justify-content-center" style={{ width: '100%', margin: '0px' }}>
                                             <div className="col-xl-7 col-lg-8 col-12" style={{ padding: '0px' }}>
                                                  <PhoneInput
                                                       country={countryName}
                                                       value={mobile}

                                                       onChange={(e, data) => { setMobile(e); setCountryCode(data.dialCode); setCountryName(data?.countryCode) }}
                                                       inputProps={{
                                                            name: 'mobile',
                                                            required: true,
                                                            autoFocus: true,
                                                            className: 'vcPhoneInp'
                                                       }}
                                                  />
                                             </div>
                                             <div className="col-xl-7 col-lg-8 col-12" style={{ padding: '15px 0px' }}>
                                                  <button type='submit' className='vcbtn2 mobileBtn1 mobileBtn4' disabled={isActive} style={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', lineHeight: 'normal', margin: '0px', padding: '0px 25px' }} value='Submit'>GET OTP</button>
                                             </div>
                                        </div>
                                   </form>
                                   <p className="modelp1">You'll receive a 6 digit code to verify next</p>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     )
}
export default ModelSignUp;