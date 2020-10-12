import {ApolloClient, InMemoryCache} from "@apollo/client";



const Apollo = () => {
    const client = new ApolloClient({
        uri: 'https://doggo.co.ua/graphql',
        cache: new InMemoryCache()
    });
    return client
}

export default Apollo()
