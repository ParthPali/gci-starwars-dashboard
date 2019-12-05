const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const { RESTDataSource } = require('apollo-datasource-rest');
const fetch = require('node-fetch');

// This holds the functions we need to fetch data
class RequestApi extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = 'https://swapi.co/api/';
    }

    async getEveryPerson(){
        const { results } = await this.get(`people/?page=1`);
        return results;
    }
    
    async getThing(url){
        return this.get(url);
    }

    async getPerson(id){
        return this.get(`people/${id}`);
    }

    async getFilm(id){
        return this.get(`films/${id}`);
        
    }
    async getPlanet(id){
        return this.get(`planets/${id}`);
    }
    async getVehicle(id){
        return this.get(`vehicles/${id}`);
    }
    async getStarShip(id){
        return this.get(`starships/${id}`);
    }

    
}

const getAllPerson = parent =>{
    const promises = parent.characters.map(async url =>{
        const response = await fetch(url);
        return response.json();
    })

    return Promise.all(promises);
}

const getAllPerson2 = parent =>{
    const promises = parent.residents.map(async url =>{
        const response = await fetch(url);
        return response.json();
    })

    return Promise.all(promises);
}

const getAllPerson3 = parent =>{
    const promises = parent.pilots.map(async url =>{
        const response = await fetch(url);
        return response.json();
    })

    return Promise.all(promises);
}

const getAllPlanets = parent =>{
    const promises = parent.planets.map(async url =>{
        const response = await fetch(url);
        return response.json();
    })

    return Promise.all(promises);
}

const getALlStarship = parent =>{
    const promises = parent.starships.map(async url =>{
        const response = await fetch(url);
        return response.json();
    })

    return Promise.all(promises);
}

const getALlVehicle = parent =>{
    const promises = parent.vehicles.map(async url =>{
        const response = await fetch(url);
        return response.json();
    })

    return Promise.all(promises);
}

const getAllFilms = parent =>{
    const promises = parent.films.map(async url =>{
        const response = await fetch(url);
        return response.json();
    })

    return Promise.all(promises);
}

const typeDefs = gql`

    type AllPerson{
        count: Int
        next: String 
        previous: String
        results: [Person]
    }
    type Film{
        title: String!
        characters: [Person]
        created: String!
        episode_id: Int!
        release_date: String!
        starships: [StarShip]
        vehicles: [Vehicle]
        planets: [Planet]
        
    }

    
    type Person{
        name: String!
        birth_year: String
        gender: String
        films: [Film]
        starships: [StarShip]
        vehicles: [Vehicle]
    }

    type Planet{
        name: String!
        climate: String
        created: String
        diameter: Int,
        edited: String,
        films: [Film]
        residents: [Person]
    }

    type Vehicle{
        cargo_capacity: Int
        cost_in_credits: Int
        created: String
        crew: Int
        edited: String
        model: String
        name: String!
        passengers: Int
        pilots: [Person]
        films: [Film]
    }
    type StarShip{
        MGLT: String
        cargo_capacity: String
        cost_in_credits: Int
        created: String
        crew: Int
        edited: String
        hyperdrive_rating: String
        manufacturer: String
        model: String
        name: String
        passengers: Int
        films: [Film]
        pilots: [Person]
    }

    type Query{
        getEveryPerson(page: Int!): AllPerson
        getFilm(id: Int!): Film
        getPerson(id: Int!): Person
        getVehicle(id: Int!): Vehicle
        getPlanet(id: Int!): Planet
        getStarShip(id: Int!): StarShip
    }

`;

const resolvers = {

    Person: {
        films: getAllFilms,
        starships: getALlStarship,
        vehicles: getALlVehicle
    },

    Film:{
        characters: getAllPerson,
        starships: getALlStarship,
        vehicles: getALlVehicle,
        planets: getAllPlanets
    },
    StarShip:{
        films: getAllFilms,
        pilots: getAllPerson,

    },
    Vehicle:{
        films: getAllFilms,
        pilots: getAllPerson3

    },
    Planet:{
        films: getAllFilms,
        residents: getAllPerson2
    },

    Query:{


        getEveryPerson: async(_,{page},) => {
            const response = await fetch(`https://swapi.co/api/people/?page=${page}`);
            const data = await response.json();
            return data;
        },

        getFilm: async(_,{id}, {dataSources}) =>{
            
            return dataSources.requestApi.getFilm(id);
        },
        getPerson: async(_,{id}, {dataSources}) =>{
            return dataSources.requestApi.getPerson(id);
        },
        getPlanet: async(_,{id}, {dataSources}) =>{
            return dataSources.requestApi.getPlanet(id);
        },
        getVehicle: async(_,{id}, {dataSources}) =>{
            return dataSources.requestApi.getVehicle(id);
        },
        getStarShip: async(_,{id}, {dataSources}) =>{
            return dataSources.requestApi.getStarShip(id);
        }

    }
};

const server = new ApolloServer({ typeDefs, resolvers, dataSources: () => {
    return { requestApi: new  RequestApi(), };
}});

const app = express();
server.applyMiddleware({app});
app.use(cors());
app.listen({port:4000}, () => console.log('server running at 4000'));
