import { useState,useEffect } from "react";


function useApiData(apiUrl){
    const [data,setData] = useState(null)
    useEffect(()=>{
        fetch(apiUrl)
        .then(res=>res.json())
        .then(data=>setData(data))
        .catch(err=>console.log(err))
    },[apiUrl])
    return data
}

export {
    useApiData
}