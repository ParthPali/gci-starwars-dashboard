import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home.js';
import People from './components/People';
import NavBar from './components/navbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



const styles = theme=> ({ 
  root: {
    backgroundColor: 'white',
  }
})

export class App extends Component {
  render() {
    let { classes } = this.props;

    return (
      

        <Router>
        <div className={classes.root}>
          <NavBar />
          <Switch>

            <Route exact path="/" component={Home} />
            <Route exact path="/people" />

          </Switch>
          </div>
        </Router>
        
      
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
