import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  Button  from "../../FrontEnd/components/commun/Button"
import { useContext, useRef } from 'react'
import { UserContext } from '../_app';
import swal from 'sweetalert'
import Logout from "../../FrontEnd/components/auth/logout";
import Link from 'next/link'

const Signup = () => {
    const { user,  setUser } = useContext(UserContext);
    const formRef = useRef('');
    const c_pass = useRef('');
    const name = useRef('');
    const email = useRef('');
    const pass = useRef('');

    const oAuthSign = (prov)=>{
        const newWindow = window.open(`/auth/login/${prov}`, '_blank', 'width=500, height=700');

    };
    const emailSign = async (e)=>{
        e.preventDefault();
        if( dataIsValid() ){
            const res = await fetch('/auth/sign', {
                method : "POST",
                headers:{
                     'Content-Type' : 'application/json'
                },
                body : JSON.stringify({ name: e.target.name.value, email: e.target.email.value, password: e.target.password.value })
            });
            const result = await res.json();
            if ( result.err ) { swal('لقد حدث خطأ ، حاول مرة اخرى') }
            email.current.innerText = result.emailErr || '';
            if ( result.success ){
                location.assign('/category/All')
            }
        }else{

        }
    }
    
    const CheckPass = ()=>{
        if (formRef.current.c_password.value != formRef.current.password.value ){
            c_pass.current.innerText = ' كلمتي السّر غير متشابهتين '
            c_pass.current.value = ' كلمتي السّر غير متشابهتين '
            return false
        }else{
            c_pass.current.innerText = ''
            c_pass.current.value = ''
            return true
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
        if ( formRef.current.name.value == '' ){
            name.current.innerText = 'املئ الفراغ من فضلك' ;
            b = false
        }else{
            name.current.innerText = '' ;
        }
        if ( formRef.current.email.value == '' ){
            email.current.innerText = 'املئ الفراغ من فضلك' ;
            b = false
        }else{
            email.current.innerText = '' ;
        }
        
        return b && CheckLength() && CheckPass()
    }
    if (user.isAuthenticated){
       return (
            <>
            <div className="Auth-container">
                <Logout user={user} />
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
                     onSubmit={(e)=>emailSign(e)}
                     ref={formRef}
                    >
                        {/* <label htmlFor="name">الاسم</label> */}
                        <input type="text" placeholder="الاسم" name="name"/>
                        <label htmlFor="nameErr" ref={name}></label>
                        <input type="text" placeholder="الايميل" name="email"/>
                        <label htmlFor="emailErr" ref={email}></label>
                        <input type="password" placeholder="كلمة السّر" name="password" onChange={CheckLength}/>
                        <label htmlFor="passErr" ref={pass}></label>
                        <input type="password" placeholder="تأكيد كلمة السّر" name="c_password" onChange={CheckPass} />
                        <label htmlFor="c_passErr" ref={c_pass} ></label>

                        <Button 
                            normal
                            color = "var(--pri-theme)"
                            text = "تسجيل حسابك"
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
                        لديك حساب ؟ 
                        <Link href="/auth/login">
                          <a> سجل الدخول </a>
                        </Link>
                    </p>
                </div>
               
            </div>
        </>
     );
}

export default Signup;