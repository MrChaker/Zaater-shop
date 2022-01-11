import { useLazyQuery } from "@apollo/client";
import  { useEffect, useState } from "react";
import Card2 from "../../components/commun/Card2"
import {  LOAD_Products } from '../../graphql/Queries';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/router'
import  Button  from '../commun/Button'
const Products = (props) => {
    const router = useRouter();
    const [ page, setPage ] = useState(1);
    const [ search, setSearch ] = useState('');
    const { categ } =   router.query ;
    
    console.log(search)
    const [getProducts, { called, data, loading }] = useLazyQuery(LOAD_Products,{variables:{ page: page, Sort: props.Sort, search: search }});
    const[products, setProducts]= useState([]);

    useEffect(()=>{
            if( location.search != '' ){
                setSearch(location.search.slice(8, location.search.length))
            }

            if(!called){
                getProducts();
            }
            if(data){
                var copy = Array.from(data.getProducts);
                if(categ.toLowerCase() == "all"){
                    setProducts(copy);
                }else{
                    copy = copy.filter( pr => pr.category === categ);
                    setProducts(copy);
                }
            }    
    }, [categ,props.Sort,loading,props.page, search])
    return ( 
        <>
            <div  dir="rtl" className={ router.pathname.includes('/admin') ? "admin_card_cont" : "card-container"}>
                
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
                {loading && <FontAwesomeIcon  icon='spinner' size='3x' spin />} 
                
            </div>
            <Button 
                    text = "المزيد"
                    color = "var(--pri-theme-dark)"
                    outline
                    style = " width: 200px; margin: 12px auto "
                    onClick = {(()=>setPage(page+1))}
            />
        </>
     ); 
} 
export default Products;