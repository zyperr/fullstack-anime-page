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
      return data;
    } catch (error) {
      throw error;
    }
  };

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
  return { getAnimes, getAnime };
}

export { useApiAnimes };
