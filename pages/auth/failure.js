import { useEffect } from "react";

const Failure = () =>{
    useEffect(()=>{
        setTimeout(() => {
            window.close();
            window.opener.reload()
        }, 1000);
    },[])
    return " Login Failed "
}
export default Failure;