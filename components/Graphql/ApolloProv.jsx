
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"; 
/* import { onError } from "@apollo/client/link/error" */


const ApolloProv = (props) => {
     //*graphQL
     /* const errorLink = onError((graphqlErrors, networkError)=>{ 
        if(graphqlErrors){ 
                alert(`GraphQl err : ${graphqlErrors}`)
                
        }
    }) */
    /* const link = from([
        errorLink,
        new HttpLink({ uri : "http://localhost:3000/api/graphql"})
    ]) */

    const client = new ApolloClient({
        uri : "http://localhost:3000/api/graphql",
        cache: new InMemoryCache()
        
    })
    return ( 
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider> 

     );
}
 
export default ApolloProv;