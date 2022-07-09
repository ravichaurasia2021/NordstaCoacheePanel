import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {isLogin, isProfile} from '../middleware/auth';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';

export function reportWebVitals(metric) {
  //console.log(metric)
}
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isAuth = ['/sign-up', '/otp-verify'];
  const isPrivateRoutes = [];
  const isRedirectPath = ['/home']
  useEffect(()=>{
    isProfile();
    if(isRedirectPath.includes(window.location.pathname))
    {
      window.open('/', '_self');
    }
    if(isAuth.includes(window.location.pathname) && isLogin())
    {
        router.push('/', undefined, {shallow:true});
    }
    if(isPrivateRoutes.includes(window.location.pathname) && !isLogin)
    {
      router.push('/sign-up', undefined, {shallow:true});
    }
  },[]);
  useEffect(() => {
    if("serviceWorker" in navigator) {
      window.addEventListener("install", function () {
       navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.error("Service Worker registration failed: ", err);
          }
        );
      });
    }
    isLogin();
  }, [])
  useEffect(()=>{

    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0);
    }
  },[])

  
  return <Component {...pageProps} />
}

export default MyApp
