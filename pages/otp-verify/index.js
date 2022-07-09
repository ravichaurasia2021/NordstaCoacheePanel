import React, {useEffect} from "react";
import Header from '../../components/Header'
import Seo from '../../helpers/Seo';
import Footer from '../../components/Footer'
import ModelOTP from '../../sections/AuthSection/ModelOTP';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import {isProfile} from '../../middleware/auth';
import { setAuthorizationToken } from "../../utils/services";
const Index=()=>{
  const router = useRouter();
  useEffect(()=>{
     setAuthorizationToken(true)
     isProfile().then((response)=>{
       if(response)
       {
        setAuthorizationToken(true)
        window.open('/', '_self')
       }else{
        setAuthorizationToken(false)
       }
     })
  },[])
    return(
        <div className='container-fluid' style={{ padding: '0px' }}>
        <Seo path='/otp-verify'/>
        <Header />
        <hr style={{background:'#DFDFDF',border:'solid #DFDFDF 1px'}}/>
        <Footer/>
        <ModelOTP/>
        <Toaster 
         position="bottom-center"
         reverseOrder={false}
         containerClassName="toastContainer"
        />
      </div>
    )
}
export default Index;