/* eslint-disable no-useless-catch */
// Todo: Agregar las demas peticiones http para los animes/mangas/manhwas de la api
function useApiAnimes() {
  const getAnimes = async (URL,page) => {
    try {
      let url = page === null ? URL : `${URL}?page=${page}`
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
      return {detail:data,res:response.status}
    }catch(error){
      console.log(error)
    }
  }
  const getAnime = async (url,id) => {
    try {
      const response = await fetch(url+id);
      const data = await response.json();
      return {data:data,res:response.status};
    }catch(error){
        throw error
    }
  }
  const addToFavorites = async (token,itemId,type) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/favorites/me?item_id=${itemId}&collection_name=${type}`,{
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
  const deleteFromFavorites = async (token,itemId) => {
    try{
      const response = await fetch(`http://127.0.0.1:8000/api/users/favorites/me?item_id=${itemId}`,{
        method: 'DELETE',
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
  const addAnime = async (url,data) => {
    try {
      const response = await fetch(url,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body:JSON.stringify(data)
      })
      const info = await response.json();
      return {info,res:info.status}
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
  return { getAnimes, getAnime,addToFavorites,getSlider,putAnime,addAnime,deleteFromFavorites };
}

export { useApiAnimes };
