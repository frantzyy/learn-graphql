import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from "graphql";

import axios from "axios";
import fetch from "node-fetch";

// https://swapi.co/api/people/1/

const BASE_URL = "http://swapi.co/api/";

function getPersonByURL(relativeURL) {
  console.log(BASE_URL + relativeURL);

  return fetch(BASE_URL + relativeURL)
    .then(res => res.json())
    .then(json => console.log(json))
    .then(json => json.person);
}

//Person Type
const PersonType = new GraphQLObjectType({
  name: "Person",
  description: "a person in starwars",

  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    homeworld: {
      type: GraphQLString
    }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "Query",
  description: "root query for a person",
  fields: {
    person: {
      type: PersonType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        return axios
          .get("http://localhost:3000/persons/" + args.id)
          .then(res => res.data);
      }
    },
    persons: {
      type: new GraphQLList(PersonType),
      resolve(parentValue, args) {
        return axios.get("http://localhost:3000/persons/").then(function(res) {
          console.log(res.data);
          return res.data;
        });
      }
    },
    posts: {
      type: new GraphQLList(PersonType),
      async resolve(parentValue, args) {
        const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
        return posts.json();
      }
    },
    starwarsPerson: {
      type: PersonType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        return axios
          .get("https://swapi.co/api/people/" + args.id)
          .then(function(res) {
            console.log(res);
            return res.data;
          });
      }
    }
  }
});

// Mututation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPerson: {
      type: PersonType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        homeworld: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parentValue, args) {
        return axios
          .post("http://localhost:3000/persons", {
            id: args.id,
            name: args.name,
            homeworld: args.homeworld
          })
          .then(res => console.log(res))
          .then(res => res.data);
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
