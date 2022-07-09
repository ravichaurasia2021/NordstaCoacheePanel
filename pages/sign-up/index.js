import React, { useEffect } from "react";
import Header from '../../components/Header'
import Seo from '../../helpers/Seo';
import Footer from '../../components/Footer'
import ModelSignUp from '../../sections/AuthSection/ModelSignUp';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import {isLogin} from '../../middleware/auth';
const Index=()=>{
  const router = useRouter();
    useEffect(()=>{
       if(isLogin())
       {
        ///window.open('/', '_self')
          router.push('/', undefined, {shallow:true})
       }
    },[])
    return(
        <div className='container-fluid' style={{ padding: '0px' }}>
        <Seo path='/sign-up'/>
        <Header />
        <hr style={{background:'#DFDFDF',border:'solid #DFDFDF 1px'}}/>
        <Footer/>
        <ModelSignUp/>
        <Toaster 
         position="bottom-center"
         reverseOrder={false}
         containerClassName="toastContainer"
        />
      </div>
    )
}
export default Index;