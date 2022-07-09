import React from 'react';
const isValidEmail=(email)=>{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.match(mailformat))
    {
        return true;
    }else{
        return false;
    }
}
const isValidNumber=(value)=>{
    var format = /-| /g;
    return value.replace(format, '')
}
const removeEmpty = (obj) => {
    Object.keys(obj).forEach((k) => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
    return obj;
};
export {isValidEmail, isValidNumber, removeEmpty};