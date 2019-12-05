import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const all = gql`
    query{
        
        getEveryPerson(page: 2){
            count
            next
            results{
                name
                gender

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

                            return <h1></h1>
                        }
                    }
                </Query>
            </div>
        )
    }
}

export default Home;
