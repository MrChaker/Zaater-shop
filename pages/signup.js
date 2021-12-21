/* import { useSession, signIn, signOut } from "next-auth/react" */
/* import Button from "../FrontEnd/components/commun/Button"; */

const Signup = () => {
    /* const { data: session } = useSession();
    console.log(session);
    const Sign = ()=>{
        if (session){
            signOut();
        console.log('h');
        }else{
            signIn("google");
        }
    } */
    return ( 
        <>
            <div className="Auth">
                {/* <Button 
                    normal
                    color = "var(--pri-theme)"
                    text="انشاء حساب"
                    block
                    onClick= {Sign}
                /> */}
            </div>
        </>
     );
}
 
export default Signup;