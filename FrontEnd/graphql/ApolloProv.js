import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client"; 
import { onError } from "@apollo/client/link/error" 

const ApolloProv = (props) => {
    const errorLink = onError((graphqlErrors, networkError)=>{ 
        if(graphqlErrors){
            graphqlErrors.map((err)=>(
                alert(`GraphQl err : ${err.message}`)
            ))
        }
    })
    const link = from([
        errorLink,
        new HttpLink({ uri : `${process.env.NEXT_PUBLIC_PORT}"/api/graphql"`})
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