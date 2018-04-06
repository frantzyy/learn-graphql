import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({
//   uri: 'https://nx9zvp49q7.lp.gql.zone/graphql'
  uri: 'https://swapi.co/api/'
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(ApolloApp, document.getElementById('root'));
