import { useQuery } from "@apollo/client";
import Image from "next/image";
import Head from "next/head"
import { LOAD_Categories } from '../../FrontEnd/graphql/Queries';
import Products from '../../FrontEnd/components/Product/Store'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
const Store = () => {
    const [ render, setRender] = useState(false);
    const [ sideBarState, setSideBarState ] = useState(false);
    const OrderBy = useRef("الاكثر طلباً");
    const changeOrder = ()=>{
        setRender(!render);
    }
    return ( 
        <>
            <div className="Store">
                    <div className='main'>
                        
                            <Sidebar state={sideBarState}/>
                            <div className="ad-background">
                            {/*  <img src="/images/zaaterbackground.jpg" alt="ad" layout='responsive' width='100%' height='100%' /> */}
                            </div>
                        
                    </div>    
                <div className="Store-products">
                    <FontAwesomeIcon 
                        icon="arrow-left" 
                        className={ sideBarState ? "burger sidebar_closer" : "burger sidebar_opener"} 
                        onClick={ () => setSideBarState(!sideBarState) }
                    />
                    <div className="OrderBy">
                        <p> المنتجات : 45</p>
                        <select name="OrderBy" id="OrderBy" ref={OrderBy} onChange={changeOrder} >
                            <option value="الاكثر طلباً"> الاكثر طلباً</option>
                            <option value="الاحدث"> الاحدث</option>
                            <option value="الأرخص سعراً"> الأرخص سعراً</option>
                            <option value="الأغلى سعراً"> الأغلى سعراً</option>
                        </select>
                </div>  
                    <Products Sort={OrderBy.current.value}/>
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
