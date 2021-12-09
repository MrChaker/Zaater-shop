import { useQuery } from "@apollo/client";
import  { useEffect, useState } from "react";
import Card2 from "../../components/commun/Card2"
import {  LOAD_Products } from '../../graphql/Queries';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/router'
import { Sorter, NumberSort, Reverse } from "./Sort";

const Products = (props) => {
    const router = useRouter();
    const { categ } =  { categ : "All"} ;
    console.log(categ)
    const { data, loading } = useQuery(LOAD_Products);
    console.log(data)

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
    }, [categ,props.Sort,loading])
    return ( 
        <>
            <div  dir="rtl" className={ router.pathname.includes('/admin') ? "admin_card_cont" : "card-container"}>
                
                {loading && <FontAwesomeIcon  icon='spinner' size='3x' spin/>} 
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