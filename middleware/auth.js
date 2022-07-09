//here make function to check exist token is valid or not

import React from 'react';
import { setAuthorizationToken } from '../utils/services';
import { fetchProfile } from '../utils/action';
import { getCookies, removeSession, setCookies} from './storage';
const isLogin = () => {
    let isToken = getCookies('isAuth') === 'true'?true:false;
    if(isToken)
    {
        setAuthorizationToken(isToken? isToken : false);
        removeSession('_initA')
    }else{
        setCookies('isAuth', false);
    }
    return isToken? true : false;
}
const isProfile = async () => {
    setAuthorizationToken(true);
    const data = await fetchProfile();
    if(data.success)
    {
        setAuthorizationToken(true);
        setCookies('isAuth', true);
        return data.data
    }else{
        setCookies('isAuth', false);
        return false;
    }
}
export { isLogin , isProfile}