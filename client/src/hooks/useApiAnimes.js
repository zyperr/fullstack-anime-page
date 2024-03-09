/* eslint-disable no-useless-catch */

// Todo: Agregar las demas peticiones http para los animes/mangas/manhwas de la api
function useApiAnimes() {
  const getAnimes = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw Error(data.message);
      }
      return {pag:data.pages,animes:data.result};
    } catch (error) {
      throw error;
    }
  };
  const putAnime = async (url,id,item) => {
    try {
      const response = await fetch(`${url}${id}`,{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body:JSON.stringify(item)
      })
      const data = await response.json();
      return {response:data,res:response.status}
    }catch(error){
      console.log(error)
    }
  }
  const getAnime = async (url,id) => {
    try {
      const response = await fetch(url+id);
      const data = await response.json();
      if (!response.ok) {
        throw Error(data.message);
      }
      return data;
    }catch(error){
        throw error
    }
  }
  const addToFavorites = async (url,token,itemId) => {
    try {
      const response = await fetch(`${url}?item_id=${itemId}`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization':`Bearer ${token}`
        },
      })
      const data = await response.json();
      return {data,res:response.status}
    }catch(error){
        console.log(error)
    }
  }
  const getSlider = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/slider");
      const data = await response.json();
      return {data:data,res:response.status}
    }catch(error){
        console.log(error)
    }
  }
  return { getAnimes, getAnime,addToFavorites,getSlider,putAnime };
}

export { useApiAnimes };
