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
        images: [ImageType],
        description: String
    }
    type CategoryType{
        name: String,
        arabic: String
    }
    type OrderedProduct{
        product_id: String,
        name: String,
        price: Int,
        image: String,
        quantity: Int,
    }
    type BuyerInfo{
        fullName: String,
        email: String,
        phone: String,
        adresse: String,
        city: String,
        postal_code: String
    }
    type OrderType{
        products: [OrderedProduct], 
        buyer: BuyerInfo,
        Total: Int
    }

    type CloudinaryFile{
        path: String,
        color: String
    }

    type Query{
        getProducts(page: Int, Sort: String): [ProductType],
        """ getSortedProducts(Sort: String): [ProductType], """
        getProduct(id: String): ProductType,
        getCategories : [CategoryType],
        getOrders: [OrderType]
    }
    input ImageInput{
        path: String,
        color:String
    }
    input OrderedProductInput{
        product_id: String,
        name: String,
        price: Int,
        image: String,
        quantity: Int,
    }
    input BuyerInput{
        fullName: String,
        email: String,
        phone: String,
        adresse: String,
        city: String,
        postal_code: String
    }

    
    type Mutation{
        createProduct(name: String, price: Int, category: String, description: String, images: [ImageInput]): ProductType,
        updateProduct(id : String, to : Int): ProductType,
        deleteProduct(id: String, publicid: String): ProductType,
        createCategory(name: String, arabic: String): CategoryType,
        uploadImage(files: [String], public_id: String): [CloudinaryFile],
        createOrder(products: [OrderedProductInput], buyer: BuyerInput, Total: Int): OrderType
    }
`