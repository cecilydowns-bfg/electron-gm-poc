import React from 'react';
import {
    ApolloProvider,
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
    from
} from '@apollo/client';

import useLocalStorage from 'react-use-localstorage';

const ApiProvider = (props) => {
    const [token] = useLocalStorage();

    const graphqlAuthLink = new ApolloLink((operation, forward) => {
        if (token && token.length > 0) {
            operation.setContext(({ headers }) => ({
                headers: {
                    authorization: `Bearer ${
                        token && token.length > 0 ? token : ''
                    }`,
                    ...headers
                }
            }));
        }

        return forward(operation);
    });

    const client = new ApolloClient({
        link: from([
            graphqlAuthLink,
            new HttpLink({
                uri: 'https://int-shop.bigfishgames.com/graphql'
            })
        ]),
        cache: new InMemoryCache()
    });

    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApiProvider;
