
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client"; 
import { onError } from "@apollo/client/link/error"


const ApolloProv = (props) => {
     //*graphQL
     const errorLink = onError((graphqlErrors, networkError)=>{ 
        if(graphqlErrors){
            graphqlErrors.map((err)=>(
                alert(`GraphQl err : ${err.message}`)
            ))
        }
    })
    const link = from([
        errorLink,
        new HttpLink({ uri : "http://localhost:4000/graphql"})
    ])

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link:link
    })
    return ( 
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider> 

     );
}
 
export default ApolloProv;