import { useQuery } from "@apollo/client";
import Card2 from "../../components/commun/Card2"

import { LOAD_Categories, LOAD_Products } from '../../graphql/Queries';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";
/* import { Link, useParams } from "react-router-dom"; */
import { Sorter, NumberSort, Reverse } from "../../components/store/Sort";
const Store = () => {
    const [ render, setRender] = useState(false)
    const OrderBy = useRef("الاكثر طلباً");
    const changeOrder = ()=>{
        setRender(!render);
    }
    return ( 
        <>
            <div className="Store">
                <div className="Store-head">
                    <Sidebar />
                    <div className='main'>
                        <div className="ad-background">
                            <img src="/images/advertise.jpg" alt="ad" />
                        </div>
                    </div>
                </div>   
                <div className="Store-products">
                    <div className="OrderBy">
                        <select name="OrderBy" id="OrderBy" ref={OrderBy} onChange={changeOrder}>
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
 
const Sidebar = ()=>{
    const [showCat, setShowCat] = useState(false);
    return(
        <>
            <div className="sideBar">
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
    const {  data } = useQuery(LOAD_Categories);
    const [ categories, setCategories]= useState([]);
    useEffect(()=>{
        if(data){
            setCategories(data.getCategories);
            /* setCategories(data); */
        }
    },[])
    return ( 
        <>
            <div className={ props.on ? ' sidebar categ on ' : 'sidebar categ'}>
                <div onClick={props.off}>
                    <FontAwesomeIcon icon='times' />
                </div>
                <div >
                        <Link href="All">
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
 
const Products = (props) => {
    const router = useRouter()
    const { categ } = router.query
    
    const { data } = useQuery(LOAD_Products);
    const[products, setProducts]= useState([]);
        useEffect(()=>{    
            if(data){
                var copy = Array.from(data.getProducts);
                let sorter = new Sorter(copy);
                switch(props.Sort){
                    case "الاكثر طلباً": 
                        sorter = new NumberSort(copy, "times_ordered");
                        break;
                    case "الأغلى سعراً": 
                        sorter = new NumberSort(copy, "price");
                        break;
                    case "الاحدث": 
                        sorter = new Reverse(copy);
                        break;
                }
                if(categ == "All" || categ == "all"){
                    sorter.Sort();  
                    setProducts(copy);
                }else{
                    sorter.Sort();
                    copy = copy.filter( pr => pr.category === categ);
                    setProducts(copy);
                }
            }    
        }, [data, categ,props.Sort])
    return ( 
        <>
            <div className="card-container">
                {/* {Pending && <FontAwesomeIcon icon='spinner' size='3x' spin/>} */} 
                { products.map((product,i)=>(
                    
                        <Card2   
                            key={i} 
                            img={`/images/${product.images[0].path}`} 
                            name={product.name} 
                            price={product.price} 
                            onSale={product.Sale}
                            link={`/Products/${product.id}`}
                        />
                    
                    )) }
            </div>
            
        </>
     ); 
} 
 

export default Store;