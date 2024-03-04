/* eslint-disable no-useless-catch */
//Todo agregar las demas peticiones http para los usuarios de la api
function useApiUser() {
  const createUser = async (data) => {
    try{
      const response = await fetch("http://127.0.0.1:8000/api/users",{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
        ,body:JSON.stringify(data)
      })
      const userData = await response.json();
      return {userData,status:response.status}
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
          "Content-Type": "application/json"
        },
      })
      const authUserData = await response.json();
      return {authUserData,status:response.status}
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
  const putBanner = async (src,token) => {
    try{
      const response = await fetch(`http://127.0.0.1:8000/api/users/banner/me?banner=${src}`,{
        method: 'PUT',
        headers:{
          'accept': 'application/json',
          'Authorization':`Bearer ${token}`,
        },
      })
      const userData = await response.json();
      return {userData,res:response.status}
    }catch(error){
      console.log(error)
    }
  }
  const putAvatar = async (src,token) => {
    try{
      const response = await fetch(`http://127.0.0.1:8000/api/users/avatar/me?avatar=${src}`,{
        method: 'PUT',
        headers:{
          'accept': 'application/json',
          'Authorization':`Bearer ${token}`,
        },
      })
      const userData = await response.json();
      return {userData,res:response.status}
    }catch(error){
      console.log(error)
    }
  }
  const getAvatars = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }catch(error){
      console.log(error)
    }
  }
  const changePassword =async  (token,userData) => {
    try{
      const response = await fetch(`http://127.0.0.1:8000/api/users/changed-password/me`,{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization':`Bearer ${token}`,
        },
        body:JSON.stringify(userData)
      })
      const data = await response.json();
      return {user:data.detail,res:response.status}
    }catch(error){
      console.log(error)
    }
  }
  const deleteUser = async () => {
    try{
      const response = await fetch(`http://127.0.0.1:8000/api/users/me`,{
        method:"DELETE",
        headers:{
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization':`Bearer ${localStorage.getItem("token")}`,
        }        
      })
      const data = await response.json();
      return {user:data.detail,res:response.status}
    }catch(error){
      console.log(error)
    }
  }
  return {createToken,getAuthUser,createUser,getBanners,putAvatar,putBanner,getAvatars,changePassword,deleteUser}
}



export {useApiUser}