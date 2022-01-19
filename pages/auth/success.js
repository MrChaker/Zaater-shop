import { useEffect } from "react";
const Success = () =>{

    useEffect(()=>{
        setTimeout(() => {
            window.close(); 
            window.opener.location.assign("/category/All")
        }, 1000);
    },[])
    return " Login Success "
}
export default Success;