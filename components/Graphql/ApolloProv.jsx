
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"; 
/* import { onError } from "@apollo/client/link/error" */


const ApolloProv = (props) => {
     
    const port = process.env.PORT  ;
    const client = new ApolloClient({
        uri : `${port}/api/graphql`,
        cache: new InMemoryCache()
        
    })
    return ( 
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider> 

     );
}
 
export default ApolloProv;