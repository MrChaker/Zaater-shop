import React, { useEffect } from "react";
import {useQuery, gql} from "@apollo/client";
import { LOAD_Categories } from "../../graphql/Queries";
const GetCategories = () => {
    const { category } = useQuery(LOAD_Categories);
    useEffect(()=>{
        console.log(category);
    },[category])
    return ( 
    <>
    
    </> 
    );
}

export default GetCategories;