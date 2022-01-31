import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../commun/Button";

const Logout = (props)=>{
    const logout = ()=>{
        location.assign('/auth/logout')
    };
    return(
        <div className="Auth">
            <p>Signed in as {props.user.info.name}</p>
            <Button 
                normal
                color = "#ea4335"
                text = "تسجيل الخروج"
                block
                onClick = {()=> logout()}
                icon = {<FontAwesomeIcon icon="ghost" />}
            /> 
        </div>
    )
}
export default Logout