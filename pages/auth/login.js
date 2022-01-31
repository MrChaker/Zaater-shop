import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  Button  from "../../FrontEnd/components/commun/Button"
import { useContext, useRef } from 'react'
import { UserContext } from '../_app';
import Logout from "../../FrontEnd/components/auth/logout";
import Link from 'next/link'
const Login = () => {
    const { user,  setUser } = useContext(UserContext);
    const formRef = useRef('');
    const email = useRef('');
    const pass = useRef('');

    const oAuthSign = (prov)=>{
        const newWindow = window.open(`/auth/login/${prov}`, '_blank', 'width=500, height=700');

    };
    const emailLogin = async (e)=>{
        e.preventDefault();
        if( dataIsValid() ){
            const res = await fetch('/auth/loginAPI', {
                method : "POST",
                headers:{
                   'Content-Type' : 'application/json'
                },
                body : JSON.stringify({ email: e.target.email.value, password: e.target.password.value })
            });
            const result = await res.json();
            pass.current.innerText = result.failure || '';
            if ( result.success ){
                location.assign('/category/All')
            }
        }else{

        }
    }
    
    const CheckLength = ()=>{
        if ( formRef.current.password.value.length < 8 ){
            if ( formRef.current.password.value.length == 0 ){
                pass.current.innerText = 'ادخل كلمة السّر  '
            }else{
                pass.current.innerText = ' كلمة السّر قصيرة '
            }
            return false
        }else{
            pass.current.innerText = '';
            return true
        }
    }
    const dataIsValid = ()=>{
        let b = true ;
        if ( formRef.current.email.value == '' ){
            email.current.innerText = 'املئ الفراغ من فضلك' ;
            b = false
        }else{
            email.current.innerText = '' ;
        }
        return b && CheckLength()
    }
    if (user.isAuthenticated){
       return (
            <>
            <div className="Auth-container">
                <Logout user={user}/>
            </div> 
            </>
        )
    }
    return ( 
        <>
            <div className="Auth-container">
                <div className="Auth">
                     
                    <form 
                     dir="rtl" 
                     onSubmit={(e)=>emailLogin(e)}
                     ref={formRef}
                    >
                        {/* <label htmlFor="name">الاسم</label> */}
                        <input type="text" placeholder="الايميل" name="email"/>
                        <label htmlFor="mailErr" ref={email}></label>
                        <input type="password" placeholder="كلمة السّر" name="password" onChange={CheckLength}/>
                        <label htmlFor="passErr" ref={pass}></label>
                        <Button 
                            normal
                            color = "var(--pri-theme)"
                            text = "تسجيل الدخول"
                            block
                            Size = "1.2rem"
                            type = "submit"
                        />
                    </form>

                    <Button 
                        normal
                        color = "#ea4335"
                        text = "استخدام حساب غوغل"
                        block
                        Size = "1.2rem"
                        onClick = {()=>oAuthSign('google')}
                        icon = {<FontAwesomeIcon icon="ghost" />}
                    />
                    <p>
                        ليس لديك حساب ؟ 
                        <Link href="/auth/signup">
                          <a> انشئ حساب </a>
                        </Link>
                    </p>
                </div>
               
            </div>
        </>
     );
}

export default Login;