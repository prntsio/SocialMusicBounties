import { ApolloClient, InMemoryCache, DefaultOptions, HttpLink } from '@apollo/client'

const APIURL = new HttpLink({ uri: 'https://api.thegraph.com/subgraphs/name/aminaura/music-nft' });

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
};

export const subgraphClient = new ApolloClient({
    link: APIURL,
    cache: new InMemoryCache(),
    defaultOptions,
});


