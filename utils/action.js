import React from 'react';
import { deleteMethod, getMethod, postMethod, putMethod, setAuthorizationToken } from './services';
const sendOtp = async (data) => {
    const response = await postMethod('auth/otp/send', data);
    return response;
}
const loginAction = async (data) => {
    const response = await postMethod('auth/login', data);
    return response;
}
const registerAction = async (data) => {
    const response = await postMethod('auth/register', data);
    return response;
}
const updateProfileData = async (data) => {
    const response = await putMethod('users/update', data);
    return response;
}
const fetchProfile = async () => {
    const response = await getMethod('users')
    return response;
}
const newsLatter = async (data) => {
    const response = await postMethod('home/newslatter', data)
    return response;
}
const getFetchProductBySlug = async (slug) => {
    const response = await getMethod('product/slug/' + slug)
    return response;
}
const contactUs = async (data) => {
    const response = await postMethod('home/contactus', data)
    return response;
}
const getInitOrder = async (slug, data) => {
    const response = await postMethod('checkout/initiate/' + slug, data)
    return response;
}
const addAddressByUser = async (data) => {
    const response = await postMethod('address/add', data)
    return response;
}
const editAddressByUser = async (id, data) => {
    const response = await putMethod('address/' + id, data)
    return response;
}
const updateOrderQuestion = async (id, data) => {
    const response = await putMethod('/checkout/order/'+id+'/questionary', data)
    return response;
}
const orderCreate = async (data) => {
    const response = await postMethod('checkout/order/create/' + data?.slug, data)
    return response;
}
const orderPayment = async (data) => {
    const response = await postMethod('checkout/order/' + data?.orderId + '/pay', data)
    return response;
}
const getMyFetchProduct = async () => {
    const response = await getMethod('dashboard/orders')
    return response;
}
const fetchAddressByUser = async () => {
    const response = await getMethod('users/addresses')
    return response;
}
const getMyFetchEvent = async () => {
    const response = await getMethod('dashboard/events')
    return response;
}


const createEventsByUser = async (data) => {
    const response = await postMethod('event/add', data)
    return response;
}

const deleteAddressByUser = async (id) => {
    const response = await deleteMethod('address/' + id)
    return response;
}

function slugify(string) {
    return string
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

const fetchUserSingleOrder = async (id) => {
    const response = await getMethod('users/user-order/' + id)
    return response;
}
const fetchTeamsList = async (id) => {
    const response = await getMethod('team/user/list')
    return response;
}
const fetchAvailSlot = async (date) => {
    const response = await postMethod('event/slots', {date:date})
    return response;
}
const uploadDocxfile = async (data) => {
    const response = await postMethod('aws/upload-doc', data)
    return response;
}
const formSubmit = async (url, method, data) => {
    let form = document.createElement("form");
    form.classList.add("d-none");
    form.id = "invisibleForm";
    form.action = process.env.API_URL + url;
    form.method = method;
    for (let key in data) {
        let input = document.createElement("input");
        input.name = key;
        input.value = data[key];
        input.type = "hidden";
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
}
export { sendOtp,fetchTeamsList,uploadDocxfile,updateOrderQuestion,fetchAddressByUser,fetchAvailSlot,slugify,fetchUserSingleOrder, addAddressByUser,getMyFetchEvent,getMyFetchProduct, createEventsByUser, deleteAddressByUser, editAddressByUser, orderCreate, orderPayment, loginAction, getFetchProductBySlug, getInitOrder, registerAction, contactUs, updateProfileData, formSubmit, fetchProfile, newsLatter }