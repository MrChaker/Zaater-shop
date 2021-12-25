import  { useEffect, useState } from 'react';
import ReusableNav from "./reusableNav";
import Logo from './logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Nav = (props) => {
    
    const navs =[{
                    name:<FontAwesomeIcon icon="bell" color="white" />,
                    link:"/",
                    id : 1
                },
                {
                    name:<FontAwesomeIcon icon="user-circle" color="white" />,
                    link:"/auth/signup", 
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