import  { useEffect, useState } from 'react';
import ReusableNav from "./reusableNav";
import Logo from './logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession, signIn, signOut } from "next-auth/react"
const Nav = (props) => {
    const { data: session } = useSession();
    console.log(session);
    const Sign = ()=>{
        if (session){
            signOut();
        console.log('h');
        }else{
            signIn("google");
        }
    }
    const navs =[{
                    name:<FontAwesomeIcon icon="bell" color="white" />,
                    link:"/",
                    id : 1
                },
                {
                    name:<FontAwesomeIcon icon="user-circle" color="white" onClick={Sign}/>,
                    link:"/", 
                    id : 2
                },
                {
                    name:<FontAwesomeIcon icon="shopping-cart" color="white" />,
                    link:"/cart",
                    counter:props.cartItems, 
                    id : 3
                }];
                const [rerender, setRerender] = useState(true);
                useEffect(()=>{
                    setRerender(!rerender)
                },[])
   
    return ( 
        <>
        
            <ReusableNav navs={navs} Logo={Logo} />
        </>
     );
}
 
export default Nav;