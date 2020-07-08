import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import fetch from 'unfetch';

export default class GraphQLClient {
    httpLink;
    webSocketLink;
    link;
    client;

    constructor(httpURI, webSocketURI) {
        this.httpLink = new HttpLink({
            uri: httpURI,
            fetch
        });
        const authLink = setContext((_, { headers }) => {
            // return the headers to the context so httpLink can read them
            return {
              headers: {
                ...headers,
                'x-hasura-admin-secret': "myadminsecretkey",
              }
            }
        });

        this.webSocketLink = new WebSocketLink({
            uri: webSocketURI,
            options: {
                lazy: true,
                reconnect: true,
                connectionParams: {
                    headers: {
                        "x-hasura-admin-secret": "myadminsecretkey",
                    }
                }
            }
        });
        
        this.link = split(this.onOperation, this.webSocketLink, authLink.concat(this.httpLink));

        this.client = new ApolloClient({
                connectToDevTools: true,
                link: this.link,
                cache: new InMemoryCache()
            });
    }

    getClient() {
        return this.client;
    }

    onOperation(op) {
        const { kind, operation } =
            getMainDefinition(op.query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    }
}
