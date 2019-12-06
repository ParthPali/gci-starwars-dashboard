import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import poster from './poster.jpg';
import Person from './Person';
import Film from './Film.js'
import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
  });

const getPerson = (pageNo) =>{
    
    const all  = gql`
    query{
        
        getEveryPerson(page: ${pageNo}){

            results{
                name
                gender
                skin_color
                birth_year
                eye_color

            }
        }

        
    }
    `;

    return all;
    
}

const getFilm = () =>{

    const all = gql`
    query{
        getEveryFilm{
            count
            results{
                episode_id
                title
                director
                release_date
                created
            }
        }
    }
    `;
    return all;
}

const getPlanet = (pageNo) =>{
    
    const all  = gql`
    query{
        
        getEveryPlanet(page: ${pageNo}){

            results{
                name
                population
                gravity
                climate
                created
            }
        }

        
    }
    `;

    return all;
    
}


export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {          
            people: null,
            film: null,
            planet: null,        
        }
    }

    QueryPeople = async pageNo =>{
        await client.query({
                    query: getPerson(pageNo)
                                })
                                .then(result => {
                                    const data = result.data
                                    
                                    this.setState({
                                        people: data.getEveryPerson.results
                                    })
                                    
                                });
    }

    QueryFilm = async () =>{
        await client.query({
                    query: getFilm()
                                })
                                .then(result => {
                                    const data = result.data
                                    this.setState({
                                        film: data.getEveryFilm.results
                                    })
                                });
    }

    QueryPlanet = async pageNo =>{
        await client.query({
                    query: getPlanet(pageNo)
                                })
                                .then(result => {
                                    const data = result.data
                                    
                                    this.setState({
                                        planet: data.getEveryPlanet.results
                                    })
                                    
                                });
    }

    async setData(point,pageNo){
        if(point == 'person'){
            await this.QueryPeople(pageNo);
        }
        if(point == 'planet'){
            await this.QueryPlanet(pageNo);
        }
    
        
    }
    async componentDidMount(){
        this.setData('person',1);
        this.setData('planet',1);
        await this.QueryFilm();
        
    }
    
    render() {

        const number = [1,2,3,4,5,6,7,8,9];
        let { classes } = this.props;

        return (

            
            <div className={classes.home}>
            <ApolloProvider client={client}>
                <div className={classes.People}>

                    <h1 className={classes.title}>CHARACTERS</h1>
                    <Grid container>
                        <Person people={this.state.people} />
                        <ul>
                            <li><Button onClick={() => this.setData('person',1)}>1</Button></li>
                            <li><Button onClick={() => this.setData('person',2)}>2</Button></li>
                            <li><Button onClick={() => this.setData('person',3)}>3</Button></li>
                            <li><Button onClick={() => this.setData('person',4)}>4</Button></li>
                            <li><Button onClick={() => this.setData('person',5)}>5</Button></li>
                            <li><Button onClick={() => this.setData('person',6)}>6</Button></li>
                            <li><Button onClick={() => this.setData('person',7)}>7</Button></li>
                            <li><Button onClick={() => this.setData('person',8)}>8</Button></li>
                            <li><Button onClick={() => this.setData('person',9)}>9</Button></li>
                        </ul>
                        
                    </Grid>

                </div>

                <div className={classes.people}>
                    <h1 className={classes.title}>Films</h1>

                    <Grid container>
                        <Film film={this.state.film} />
                    </Grid>
                </div>
                </ApolloProvider>
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme=> ({
    
    poster:{
        width: '100%',
        height: '300px'
    },
    home:{
        margin: '40px',
        paddingTop: '100px',
    },
    title:{
        
        padding: '15px',
        color: '#FFE81F',
        borderRadius: '10px',
        backgroundColor: 'black',
        textAlign: 'center'
    },
    card:{
        margin: '10px',
        color: '#FFE81F',
        backgroundColor: 'black'
    },
    name:{

        borderBottom: '2px white'
    }
})

export default withStyles(styles)(Home);