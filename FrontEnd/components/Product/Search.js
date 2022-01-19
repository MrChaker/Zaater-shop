import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { useEffect, useRef } from 'react'
import Router from "next/router"
const Search = () => {
    const search = useRef('');
    const searchQ = ( ) => {
        if ( Router.pathname.includes('/admin') ){
            Router.push(`/admin/products/All?search=${search.current.value}`)
        }else{
            /* location.assign(`/category/All?search=${search.current.value}`) */
            Router.push(`/category/All?search=${search.current.value}`);
        }
    };
    useEffect(()=>{
        window.addEventListener('keydown', ( key)=>{
            if ( key.key == "Enter"  && search.current == document.activeElement ){
                searchQ();           
            }
        })
    }, [])
    return ( 
        <div className="search">
                <input type="text" className="search-bar" placeholder={"... " + `بحث`} ref={search}/>
                <div className="search-logo">
                    <FontAwesomeIcon icon="search" color="black" onClick={searchQ} cursor='pointer'/>
                </div>
        </div>
     );
}
 
export default Search;