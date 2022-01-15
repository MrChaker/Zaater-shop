import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  Button  from "../../FrontEnd/components/commun/Button"

const Login = () => {
    
    return ( 
        <>
            <div className="Auth-container">
                <div className="Auth">
                    <Button 
                        normal
                        color = "#ea4335"
                        text = "استخدام حساب غوغل"
                        block
                        onClick = {()=>{}}
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
 
export default Login;