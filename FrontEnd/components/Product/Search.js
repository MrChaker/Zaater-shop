import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { useEffect, useRef, useState } from 'react'
import Router from "next/router"
const Search = () => {
    const search = useRef('');
    const searchQ = ( ) => {
        if ( Router.pathname.includes('/admin') ){
            location.assign(`/admin/products/All?search=${search.current.value}`)
        }else{
            location.assign(`/category/All?search=${search.current.value}`)
        }
    };
    const [ focus, setFocus ] = useState(false)
    useEffect(()=>{
        window.addEventListener('keydown', ( key)=>{
            if ( key.key == "Enter" && search.current.value != '' && focus ){
                searchQ()
            }
        })
        
    }, [focus])
    return ( 
        <div className="search">
                <input type="text" className="search-bar"  onFocusCapture={()=>setFocus(true)} placeholder={"... " + `بحث`} ref={search}/>
                <div className="search-logo">
                    <FontAwesomeIcon icon="search" color="black" onClick={searchQ} cursor='pointer'/>
                </div>
        </div>
     );
}
 
export default Search;