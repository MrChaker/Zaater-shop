import React, { useEffect, useState } from 'react'

import Card2 from "../commun/Card2"
import Title from "../commun/title"
import { LOAD_Products } from '../../graphql/Queries';
import { useQuery } from '@apollo/client';

const MostSold = () => {
        const {  data } = useQuery(LOAD_Products);
        const[products, setProducts]= useState([]);
        useEffect(()=>{
            if(data){
                setProducts(data.getProducts);
            }    
        }, [data])
    return ( 
        <>
            
            <Title text="الأكثر مبيعا" />
            <div className="card-container">
                {/* {Pending && <FontAwesomeIcon icon='spinner' size='3x' spin/>} */}
                { products.map((product,i)=>(
                    
                        <Card2 
                             key={i}
                            img={`/images/${product.images[0].path}`} 
                            name={product.name} 
                            price={product.price} 
                            onSale={product.Sale}
                            link={`Products/${product.id}`}
                        />
                    
                    )) }
            </div>
            
        </>
     );
}
 
export default MostSold;