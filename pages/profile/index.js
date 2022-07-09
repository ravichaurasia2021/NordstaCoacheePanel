import React, { useEffect } from "react";
import Header from '../../components/Header'
import Seo from '../../helpers/Seo';
import Footer from '../../components/Footer'
import ProfileUpdate from '../../sections/AuthSection/ProfileUpdate';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { isProfile } from '../../middleware/auth';
import { setAuthorizationToken } from "../../utils/services";
const Index = () => {
  const router = useRouter();
  useEffect(async () => {
    setAuthorizationToken(true);
    await isProfile().then((response)=>{
      if(response.success){
        setAuthorizationToken(true)
      }else{
        setAuthorizationToken(false)
      }
    })
  }, [])
  return (
    <div className='container-fluid' style={{ padding: '0px' }}>
      <Seo path='/profile' />
      <Header />
      <hr style={{ background: '#DFDFDF', border: 'solid #DFDFDF 1px' }} />
      <Footer />
      <ProfileUpdate />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        containerClassName="toastContainer"
      />
    </div>
  )
}
export default Index;