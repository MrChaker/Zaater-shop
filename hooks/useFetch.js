import { useState, useEffect } from "react";
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [Pending, setPending] = useState(true);
    useEffect(()=>{
        const abort = new AbortController();
        fetch(url, { signal : abort.signal})
          .then(res => {
              return res.json()
          })
          .then(data => {
              setData(data);
               setPending(false)  
            })
          .catch(err => console.log(err))
        return ()=> abort.abort()  
    },[url])
    return { data, Pending};
}
 
export default useFetch;