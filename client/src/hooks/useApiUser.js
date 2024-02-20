/* eslint-disable no-useless-catch */

//Todo agregar las demas peticiones http para los usuarios de la api
function useApiUser() {
  const getUsers = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }catch(error){
      throw error
    }
  }
  const getUser = async (url,id) => {
    try {
      const response = await fetch(url,id);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  return {getUser,getUsers}
}

export {useApiUser}