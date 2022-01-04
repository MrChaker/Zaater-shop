import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"; 

const ApolloProv = (props) => {
    const client = new ApolloClient({
        uri : `${process.env.NEXT_PUBLIC_PORT}/api/graphql`,
        cache: new InMemoryCache()   
    })
    return ( 
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider> 
     );
}
 
export default ApolloProv;