//here write a code for dynamic head tags and here use to integrate exernal linking(GTP, FB Pixel etc...)
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
const Seo = (props) => {
    const SEOCOLLECTION = [
        {
            path: '/',  //public
            title: 'Login | Nordsta',
            description: 'Nordsta',
            metaTitle: 'Home | Nordsta',
            metaDescription: 'Nordsta',
            image: '/favicon.png',
        },
        {
            path: '/sign-up',  //public
            title: 'Sign Up | Nordsta',
            description: 'Nordsta',
            metaTitle: 'Sign Up | Nordsta',
            metaDescription: 'Nordsta',
            image: '/favicon.png',
        },
        {
            path: '/otp-verify',  //public
            title: 'OTP Verify | Nordsta',
            description: 'Nordsta',
            metaTitle: 'OTP Verify | Nordsta',
            metaDescription: 'Nordsta',
            image: '/favicon.png',
        },
        {
            path: '/profile',  //public
            title: 'Profile | Nordsta',
            description: 'Nordsta',
            metaTitle: 'Profile | Nordsta',
            metaDescription: 'Nordsta',
            image: '/favicon.png',
        }
 
    ]
    function seo(pathcheck) {
        const data = SEOCOLLECTION.find(({ path }) => path === pathcheck ? path === pathcheck : false);
        return data ? data : false;
    }
    return (
        <Head>
            <title>{props?.isDynamic?props?.data?.metaTitle:seo(props?.path)?.title}</title>
            <meta name="description" content={props?.isDynamic? props?.data?.metaDescription : seo(props?.path)?.metaDescription} />
            <meta httpEquiv="content-language" content="en" />
            <link rel="icon" href={props?.isDynamic? '/favicon.png' : seo(props?.path)?.image} />
            <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            </style>
        </Head>
    )
}
export default Seo;

