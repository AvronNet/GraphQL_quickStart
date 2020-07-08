import React from "react";
import HomePage from "./../home";
import QueriesPage from "./../queries";
import MutationsPage from "./../mutations";
import SubscriptionsPage from "./../subscriptions";
import { Switch, Route, Router } from "./../../util/router.js";
import { ProvideAuth } from "./../../util/auth.js";
import GraphQLClient from './../../graphql-client';
import { ApolloProvider } from 'react-apollo';
import "./styles.scss";

function App(props) {
    const graphQLClient = new GraphQLClient(
        `${window.location.protocol === 'https:' ? 'https' : 'http'}://localhost:8080/v1/graphql`,
        `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://localhost:8080/v1/graphql`
    );
  return (
    <ProvideAuth>
        <ApolloProvider client={graphQLClient.getClient()}>
            <Router>
                <Switch>
                <Route exact path="/" component={HomePage} />

                <Route exact path="/queries" component={QueriesPage} />

                <Route exact path="/mutations" component={MutationsPage} />

                <Route exact path="/subscriptions" component={SubscriptionsPage} />

                <Route
                    component={({ location }) => {
                    return (
                        <div
                        style={{
                            padding: "50px",
                            width: "100%",
                            textAlign: "center"
                        }}
                        >
                        The page <code>{location.pathname}</code> could not be found.
                        </div>
                    );
                    }}
                />
                </Switch>
            </Router>
        </ApolloProvider>
    </ProvideAuth>
  );
}

export default App;
