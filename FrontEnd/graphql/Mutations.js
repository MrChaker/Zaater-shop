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
const NEW_Product = gql`
    mutation createProduct(
        $name: String!,
        $price: Int!,
        $category: String!,
        $images: [ImageInput]!
        ) {
        createProduct(name: $name, price: $price, category: $category, images: $images){
            id
        }
}
`
const DELETE_Product = gql`
    mutation deleteProduct($id: String!){
        deleteProduct(id: $id){
            id
        }
    }
`
const NEW_Category = gql`
    mutation createCategory(
        $name: String!,
        $arabic : String!
        ) {
        createCategory(name: $name, arabic: $arabic){
            name
        }
}
`
const IMAGE_UPLOAD = gql`
    mutation uploadImage(
        $file: String!,
        $public_id : String!
        ) {
        uploadImage(file: $file, public_id: $public_id){
            secure_url
            color
        }
}
`
export { TIMES_Ordered, NEW_Product, DELETE_Product, NEW_Category, IMAGE_UPLOAD }