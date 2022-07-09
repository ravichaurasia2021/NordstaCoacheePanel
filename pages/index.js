import React, { useEffect } from 'react';
import Seo from '../helpers/Seo';
import { Toaster } from 'react-hot-toast';
import { isLogin } from '../middleware/auth';
import SignInSection from '../sections/AuthSection/SignInSection';
const Index=()=>{
  useEffect(() => {
    isLogin()
  }, [])
  return (
    <div className='container-fluid' style={{ padding: '0px' }}>
      <Seo path='/' />
      <SignInSection/>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        containerClassName="toastContainer"
      />
    </div>
  )
}

export default Index;