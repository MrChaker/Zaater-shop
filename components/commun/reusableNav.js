import React,{useEffect, useState} from 'react';
import  Link  from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ReusableNav = (props) => {

        //adding scrolling effect to navbar
        const [ scrolled, setScrolled] = useState(false);
       
        useEffect(()=>{
            
                window.addEventListener('scroll', () => {
                    
                    if (window.pageYOffset > 120) {               
                        setScrolled(true)
                    } else {
                        setScrolled(false)
                    }
                });
            
        },)
    return ( 
        <nav  className={scrolled ? "scrolledNav": ""}>
            <props.Logo/>
            <div className="search">
                <input type="text" className="search-bar" placeholder={"... " + `بحث`}/>
                <div className="search-logo">
                    <FontAwesomeIcon icon="search" color="black"/>
                </div>
            </div>
            <ul>
                { props.navs.map( (nav) =>(
                    <Link href={nav.link} key={nav.id} >
                        <a >
                        <li>
                            {nav.counter!=undefined && nav.counter > 0 && <div className="cart-item-counter">{nav.counter}</div>}
                            {nav.name}
                        </li>
                        </a>
                    </Link>                   
                )) }
            </ul>
        </nav>
     );
}
 
export default ReusableNav;