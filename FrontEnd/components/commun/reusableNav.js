import {useEffect, useState} from 'react';
import  Link  from 'next/link';
import Search from '../Product/Search';

const ReusableNav = (props) => {

        //adding scrolling effect to navbar
        const [ scrolled, setScrolled] = useState(false);
       
        useEffect(()=>{
            
                window.addEventListener('scroll', () => {
                    
                    if (window.pageYOffset > 120 && !scrolled) {               
                        setScrolled(true)
                    } else if (window.pageYOffset <= 120 && scrolled) {
                        setScrolled(false)
                    }
                });
            
        },[]);

        
    return ( 
        <nav  className={scrolled ? "scrolledNav": ""}>
            <props.Logo/>
            <Search />
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