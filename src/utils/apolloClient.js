import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_API = import.meta.env.VITE_GRAPHQL_API;

const apolloClient = new ApolloClient({
    uri: GRAPHQL_API,
    cache: new InMemoryCache(),
});

export default apolloClient;