import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const all = gql`
    query{
        getPerson(id: 1){
            name
            films{
                title
            }
        }
    }
`;
export class Home extends Component {
    render() {
        return (
            <div>
                <Query query={all}>
                    {
                        ({loading,error,data}) =>{
                            if(loading) return <h2>Loading ....</h2>
                            if(error) console.log(error)
                            console.log(data)

                            return <h1>{data.getPerson.films[0].title}</h1>
                        }
                    }
                </Query>
            </div>
        )
    }
}

export default Home;
