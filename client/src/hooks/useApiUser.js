/* eslint-disable no-useless-catch */
//Todo agregar las demas peticiones http para los usuarios de la api
import { useEffect, useState } from "react";
function useApiUser() {
  const createUser = async (url,data) => {
    try{
      const response = await fetch(url,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
        ,body:JSON.stringify(data)
      })
      const userData = await response.json();
      return {userData,res:response.status}
    }catch(error){
      console.log(error)
    }  
  }
  const createToken = async (url,username,password) => {
    try {
      const params = 'grant_type=&username='+username+'&password='+password+'&scope=&client_id=&client_secret=';
      const response = await fetch(url,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json'
        },
        body:params
      });
      const tokenData = await response.json();
      return {tokenData,status:response.status}
    }catch(error){
      console.log(error)
    }
  }
  const getAuthUser = async (url,token) => {
    try {
      const response = await fetch(url,{
        method: 'GET',
        headers:{
          'Authorization':`Bearer ${token}`,
          'accept': 'application/json',
        }
      })
      const authUserData = await response.json();
      return authUserData
    }catch(error){
      console.log(error)
    }
  }
  const getBanners = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }catch(error){
      console.log(error)
    }
  }
  return {createToken,getAuthUser,createUser,getBanners}
}


export {useApiUser}