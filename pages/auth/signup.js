import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import  Button  from "../../FrontEnd/components/commun/Button"

const Signup = () => {
    const { data: session, status } = useSession();
    console.log(session);

    const SignIn = async ()=>{
            signIn('google')
              
    }
    
    /* const SignOut = ()=>{
        signOut();
    } */
    if (status === "authenticated") {
        return (
            <>
            <div className="Auth-container">
                <p>Signed in as {session.user.email}</p>
                <Button 
                        normal
                        color = "#ea4335"
                        text = "تسجيل الخروج"
                        block
                        onClick = {()=> signOut()}
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
                        onClick = {SignIn}
                        icon = {<FontAwesomeIcon icon="ghost" />}
                    /> 
                    <Button 
                        normal
                        color = "#1877F2"
                        text = "استخدام حساب فيسبوك"
                        block
                        onClick = {SignIn}
                        icon = {<FontAwesomeIcon icon="ghost" />}
                    /> 

                </div>
               
            </div>
        </>
     );
}
 
export default Signup;