import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  Button  from "../../FrontEnd/components/commun/Button"
import {useEffect, useContext } from 'react'
import { UserContext } from '../_app';
const Signup = () => {
    const { user,  setUser } = useContext(UserContext);

    const SignGoogle = async ()=>{
        const newWindow = window.open(`/auth/login/google`, '_blank', 'width=500, height=700');

    };
    const logout = async ()=>{
        location.assign('/auth/logout')
    };
    if (user.isAuthenticated){
       return (
            <>
            <div className="Auth-container">
                <p>Signed in as {user.info.name}</p>
                <Button 
                        normal
                        color = "#ea4335"
                        text = "تسجيل الخروج"
                        block
                        onClick = {()=> logout()}
                        icon = {<FontAwesomeIcon icon="ghost" />}
                /> 
            </div> 
            </>
        )
    }
    return ( 
        <>
            <div className="Auth-container">
                <div className="Auth">
                    <Button 
                        normal
                        color = "#ea4335"
                        text = "استخدام حساب غوغل"
                        block
                        onClick = {SignGoogle}
                        icon = {<FontAwesomeIcon icon="ghost" />}
                    /> 
                    <Button 
                        normal
                        color = "#1877F2"
                        text = "استخدام حساب فيسبوك"
                        block
                        onClick = {()=>{}}
                        icon = {<FontAwesomeIcon icon="ghost" />}
                    /> 

                </div>
               
            </div>
        </>
     );
}

export default Signup;