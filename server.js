const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');


const getHomeWorld = async parent =>{
    const response = await fetch(parent.homeworld);
    const data = await response.json();
    return data;
}
const getAllPerson = parent =>{
    const promises = parent.characters.map(async url =>{
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
const getAllPerson2 = parent =>{
    const promises = parent.residents.map(async url =>{
        const response = await fetch(url);
        return response.json();
    })

    return Promise.all(promises);
}

const getAllPeople = parent =>{
    const promises = parent.people.map(async url =>{
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
    type AllFilm{
        count: Int
        results:[Film]
    }
    type AllPlanet{
        count: Int
        results: [Planet]
    }
    type AllVehicle{
        count: Int
        results: [Vehicle]
    }
    type AllStarShip{
        count: Int
        results: [StarShip]
    }
    type AllSpecies{
        count: Int
        results: [Species]
    }
    type Film{
        title: String!
        director: String!
        producer: String!
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
        eye_color: String
        skin_color: String
        films: [Film]
        starships: [StarShip]
        vehicles: [Vehicle]
        hair_color: String
        mass: String
    }

    type Planet{
        name: String!
        climate: String
        created: String
        diameter: String
        edited: String
        films: [Film]
        residents: [Person]
        population: String
        gravity: String
        terrain: String
        surface_water: String
    }

    type Vehicle{
        cargo_capacity: String
        cost_in_credits: String
        created: String
        crew: Int
        edited: String
        model: String
        name: String!
        passengers: String
        pilots: [Person]
        films: [Film]
    }
    type StarShip{
        MGLT: String
        cargo_capacity: String
        cost_in_credits: String
        created: String
        crew: String
        edited: String
        hyperdrive_rating: String
        manufacturer: String
        model: String
        name: String
        passengers: String
        films: [Film]
        pilots: [Person]
    }
    type Species{
        name: String!
        classification: String
        average_height: String
        homeworld: String
        homeworldData: Planet
        language: String
        people: [Person]
        films: [Film]

    }

    type Query{
        getEveryPerson(page: Int!): AllPerson
        getEveryFilm: AllFilm
        getEveryPlanet(page: Int!): AllPlanet
        getEveryVehicle(page: Int!): AllVehicle
        getEveryStarShip(page: Int!): AllStarShip
        getEverySpecies(page: Int!): AllSpecies
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
        pilots: getAllPerson3

    },
    Vehicle:{
        films: getAllFilms,
        pilots: getAllPerson3

    },
    Planet:{
        films: getAllFilms,
        residents: getAllPerson2
    },
    Species:{
        homeworldData: getHomeWorld,
        films: getAllFilms,
        people: getAllPeople
    },

    Query:{


        getEveryPerson: async(_,{page},) => {
            const response = await fetch(`https://swapi.co/api/people/?page=${page}`);
            const data = await response.json();
            return data;
        },

        getEveryFilm: async(_,) => {
            const response = await fetch(`https://swapi.co/api/films/`);
            const data = await response.json();
            return data;
        },

        getEveryPlanet: async(_,{page},) => {
            const response = await fetch(`https://swapi.co/api/planets/?page=${page}`);
            const data = await response.json();
            return data;
        },

        getEveryVehicle: async(_,{page},) => {
            const response = await fetch(`https://swapi.co/api/vehicles/?page=${page}`);
            const data = await response.json();
            return data;
        },

        getEveryStarShip: async(_,{page},) => {
            const response = await fetch(`https://swapi.co/api/starships/?page=${page}`);
            const data = await response.json();
            return data;
        },

        getEverySpecies: async(_,{page},) => {
            const response = await fetch(`https://swapi.co/api/species/?page=${page}`);
            const data = await response.json();
            return data;
        },

    }
};

const server = new ApolloServer({ typeDefs, resolvers,});

const app = express();
server.applyMiddleware({app});
app.use(cors());
app.listen({port:4000}, () => console.log('server running at 4000'));
