import {gql} from "@apollo/client";

 const TIMES_Ordered = gql`
    mutation updateProduct(
        $id: String!,
        $to: Int!
        ) {
        updateProduct(id: $id, to: $to){
            id
        }
        
    }
`;
export { TIMES_Ordered }