import { gql } from 'apollo-server-micro';
export const typeDefs = gql`
    type ImageType {
        path: String,
        color:String
    }

    type ProductType{
        id :String,
        price : Int,
        times_ordered : Int,
        name : String,
        category: String,
        images: [ImageType]
    }
    type CategoryType{
        name: String,
        arabic: String
    }
    type Query{
        getProducts: [ProductType],
        getCategories : [CategoryType]
    }
    input ImageInput{
        path: String,
        color:String
    }

    type CloudinaryFile{
        file: String,
        public_id: String,
        secure_url: String,
        color: String
    }
    type Mutation{
        createProduct(name: String, price: Int, category: String, images: [ImageInput]): ProductType,
        updateProduct(id : String, to : Int): ProductType,
        deleteProduct(id: String): ProductType,
        createCategory(name: String, arabic: String): CategoryType,
        uploadImage(file: String, public_id: String): CloudinaryFile
    }
`