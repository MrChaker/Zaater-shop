import { useQuery } from "@apollo/client";
import { LOAD_Categories } from '../../FrontEnd/graphql/Queries';
import Products from '../../FrontEnd/components/Product/Store'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect,  useState } from "react";
import Link from "next/link";
import { SortingContext } from "../_app";
import OrderBy from '../../FrontEnd/components/Product/OrderBy'
import Button from '../../FrontEnd/components/commun/Button'
import Router from 'next/router'
const Store = () => {
    const [ sideBarState, setSideBarState ] = useState(false);
    const { value } = useContext(SortingContext);
    const [ searched, setSearched ] = useState("");
    useEffect(()=>{
        setSearched( location.search ? location.search.slice(8, location.search.length): '')
    },[])
    const rmSearch = ()=>{
        Router.push('/category/All');
        setSearched('');
    }
    return ( 
        <>
            <div className="Store">
                    <div className='main'>
                        
                            <Sidebar state={sideBarState}/>
                             <img src="/images/zaaterbackground.jpg" alt="ad" layout='responsive' width='100%' height='100%' />
                        
                    </div>    
                <div className="Store-products">
                    <FontAwesomeIcon 
                        icon="arrow-left" 
                        className={ sideBarState ? "burger sidebar_closer" : "burger sidebar_opener"} 
                        onClick={ () => setSideBarState(!sideBarState) }
                    />
                    <div className="OrderBy">
                        <p> المنتجات : 45</p>
                        <OrderBy />
                    </div>
                    <div className="searchTag">
                    {
                        searched && searched != "" &&
                        <Button 
                            normal
                            color = "var(--bg-grey)"
                            text = { searched }
                            righticon = { <FontAwesomeIcon icon='times' /> }
                            onClick = {rmSearch}
                        />
                    }
                    </div>  
                    <Products Sort={value}/>
                </div>
            </div>
            
        </>
     );
}
 
const Sidebar = (props)=>{
    const [showCat, setShowCat] = useState(false);
    
    return(
        <>
            <div className={ props.state ? "sideBar sideBar-visible " : "sideBar"}>
                <h4>مرحبا بك في زعتر مان شوب</h4>
                <div className="categories" onClick={()=>setShowCat(true)}>
                    تصفح الأقسام <FontAwesomeIcon icon='angle-left' />
                </div>
                <CategNavigation on={showCat} off={()=>setShowCat(false)}/>
                
            </div>
        </>
    )
}
const CategNavigation  = (props) => {
    const { loading,  data  } = useQuery(LOAD_Categories);
    const [ categories, setCategories]= useState([]);
    useEffect(()=>{
        if(data){
            setCategories(data.getCategories);
            /* setCategories(data); */
        }
    },[loading]) ;

    return ( 
        <>
            
            <div className={ props.on ? ' sidebar categ on ' : 'sidebar categ'}>
                <div onClick={props.off}>
                    <FontAwesomeIcon icon='times' />
               </div>
                <div >
                        <Link href="/category/All">
                            <a>
                            الكلّ
                            </a>
                        </Link>
                </div>
                {  categories.map(( cat, i) => (
                    <div key={i}>
                        <Link href={cat.name}>
                           <a > {cat.arabic}</a>
                        </Link>
                    </div>
                ))}
            </div>
        </>
     );
}
 

export default Store;
