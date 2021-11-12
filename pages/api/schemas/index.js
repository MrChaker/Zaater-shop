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
`