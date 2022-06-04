import { ApolloClient, InMemoryCache, DefaultOptions, HttpLink } from '@apollo/client'
import { ApolloLink } from '@apollo/client/link/core';
import { LENS_TOKEN } from '../../utils/local-storage/keys'



const APIURL = new HttpLink({ uri: 'https://api-mumbai.lens.dev/' });





// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new ApolloLink((operation, forward) => {
   console.log("authLink");
  
    // Retrieve the authorization token from local storage.
    const token = localStorage.getItem(LENS_TOKEN);

    let accessToken = '';
    if (!!token) {
        ({ accessToken } = JSON.parse(token));
    }

    // Use the setContext method to set the HTTP headers.
    if (token) {
        operation.setContext({
            headers: {
                'x-access-token': `Bearer ${accessToken}`,
            },
        });
    }

    // Call the next link in the middleware chain.
    return forward(operation);
});

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

export const apolloClient = new ApolloClient({
    link: authLink.concat(APIURL),
    cache: new InMemoryCache(),
    defaultOptions,
});


