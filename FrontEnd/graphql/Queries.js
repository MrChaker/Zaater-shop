import {gql} from "@apollo/client";

 const LOAD_Products = gql`
    query getProducts($page: Int!, $Sort: String){
        getProducts(page: $page, Sort: $Sort){
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
const LOAD_OneProduct = gql`
    query getProduct($id: String!){
        getProduct(id: $id){
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
const LOAD_Orders = gql`
    query{
        getOrders{
            products {
                product_id
                name
                image
                quantity
                price
            }
            buyer{
                fullName
                city
                adresse
                email
                phone
                postal_code
            }
        }
    }
`;
export { LOAD_Categories, LOAD_Products, LOAD_Orders, LOAD_OneProduct}