import { useLazyQuery } from "@apollo/client";
import  { useEffect, useState } from "react";
import Card2 from "../../components/commun/Card2"
import {  LOAD_Products } from '../../graphql/Queries';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/router'

const Products = (props) => {
    const router = useRouter();
    const { categ } =  {categ: "All"}/* router.query */ ;
    const [getProducts, { called, data, loading }] = useLazyQuery(LOAD_Products,{variables:{ page: 1, Sort: props.Sort }});
    const[products, setProducts]= useState([]);
    useEffect(()=>{
            if(!called){
                getProducts();
            }
            if(data){
                var copy = Array.from(data.getProducts);
                if(categ == "All" || categ == "all"){
                    setProducts(copy);
                }else{
                    copy = copy.filter( pr => pr.category === categ);
                    setProducts(copy);
                }
            }    
    }, [categ,props.Sort,loading])
    return ( 
        <>
            <div  dir="rtl" className={ router.pathname.includes('/admin') ? "admin_card_cont" : "card-container"}>
                
                {loading && <FontAwesomeIcon  icon='spinner' size='3x' spin />} 
                { products.map((product,i)=>(
                    
                        <Card2   
                            key={i} 
                            id= {product.id}
                            img={`${product.images[0].path}`} 
                            name={product.name} 
                            price={product.price} 
                            onSale={product.Sale}
                            link={`/Products/${product.id}`}
                            admin= { router.pathname.includes('/admin') } 
                        />
                    
                    )) }
            </div>
            
        </>
     ); 
} 
export default Products;