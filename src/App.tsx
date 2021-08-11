import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { HomePage } from './Pages/HomePage';
import { LoginPage } from './Pages/LoginPage';

const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <LoginPage />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}
