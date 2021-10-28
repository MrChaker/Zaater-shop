import React, { useEffect } from "react";
import {useQuery, gql} from "@apollo/client";
import { LOAD_Products } from "../../graphql/Queries";
const GetProducts = () => {

    useEffect(()=>{
        console.log(data);
    },[data])
    return ( 
    <>
    
    </> 
    );
}

export default GetProducts;