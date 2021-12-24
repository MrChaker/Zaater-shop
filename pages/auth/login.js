import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import  Button  from "../../FrontEnd/components/commun/Button"

const Login = () => {
    const { data: session } = useSession();
    const Router = useRouter();
    console.log(session);
    const Sign = async ()=>{
        if (session){
            signOut();
        }else{
            signIn("google")
              .then(()=>Router.push("/category/All"))
        }
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
                        onClick = {Sign}
                        icon = {<FontAwesomeIcon icon="ghost" />}
                    /> 
                    <Button 
                        normal
                        color = "#1877F2"
                        text = "استخدام حساب فيسبوك"
                        block
                        onClick = {Sign}
                        icon = {<FontAwesomeIcon icon="ghost" />}
                    /> 

                </div>
               
            </div>
        </>
     );
}
 
export default Login;