import {gql} from "@apollo/client";

 const LOAD_Products = gql`
    query{
        getProducts{
        id
        price    
        name
        category
        times_ordered
        description
        images{
            path
            color
        }
        }
    }
`;
const LOAD_Categories = gql`
    query{
        getCategories{
            name
            arabic
        }
    }
`;
export { LOAD_Categories, LOAD_Products}