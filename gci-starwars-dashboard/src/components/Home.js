import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import poster from './poster.jpg';
import Person from './Person';
import { Grid } from '@material-ui/core';

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
    }
})

const getPerson = (pageNo) =>{
    
    const all = gql`
    query{
        
        getEveryPerson(page: ${pageNo}){
            count
            next
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
/*
const makeQuery = (pageNo) =>{
    return(
    <Query query={getPerson(pageNo)}>
        {({loading, error, data }) =>{
            if(loading) return 1
            if(error) console.log(error)
            return data;
        }}
    </Query>
    )
}*/

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

            People: {
                currentPage: null,
                count: null,
                people: null,
                per_page: null,
            }
            
        }
    }
    makeQuery = (pageNo) =>{
        return(
        <Query query={getPerson(pageNo)}>
            {({loading, error, data }) =>{
                if(loading) return 1
                if(error) console.log(error)
                const result = data.getEveryPerson.results
                console.log(result);
                return result;
            }}
        </Query>
        )
    }
    changeState = (pageNo) =>{
        const { data } = this.makeQuery(pageNo);
        console.log(data);
    }
    
    setPageNumber = pageNo =>{
        this.setState({
            People:{
                currentPage: pageNo
            }
        })
    }

    componentDidMount(){
        console.log("hello");
        let data = [];  
        data = this.makeQuery(1)
        console.log(data);
        console.log('compo data');
    }

    render() {

        let { classes } = this.props;

        return (

            
            <div className={classes.home}>
            
                <div className={classes.People}>

                    <h1 className={classes.title}>CHARACTERS</h1>
                    <Grid container>
                    {this.makeQuery(1)}
                    {/*
                        <Query query={getPerson(this.state.People.currentPage)}>
                        {
                            ({loading,error,data}) =>{
                                if(loading) return <h2>Loading ....</h2>
                                if(error) console.log(error)
                                console.log(data.getEveryPerson.results)

                                return <Person people={data.getEveryPerson.results} />

                            }                            
                        }
                    </Query>*/}
                    </Grid>

                </div>
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);