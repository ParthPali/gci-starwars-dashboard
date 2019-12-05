import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home.js';
import People from './components/People';
import NavBar from './components/navbar';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});


function App() {
  return (
    <ApolloProvider client={client}>

      <Router>
        <NavBar />
        <Switch>

          <Route exact path="/" component={Home} />
          <Route exact path="/people" />

        </Switch>
      </Router>
      
    </ApolloProvider>
  );
}

export default App;
