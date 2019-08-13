const graphql = require('graphql');
const _ = require('lodash');
const {GraphQLObjectType,GraphQLSchema,GraphQLString, GraphQLID , GraphQLInt} = graphql;

// root queries are how we init
//this is all relational

let books = [
  {name: 'Sandman: preludes and nocturnes', genre: 'Fantasy', id:1},
  {name: 'American Gods', genre:'Fantasy', id:2},
  {name: 'How I do sports', genre:'Memoir', id:3},
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
  })
})

const RootQuery = new GraphQLObjectType ({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: {type: GraphQLID}}, /* <--- Pass an id to graph ql when looking for an id - it should be a string
      you'll need to pass args because otherwise you wont know WHICH book.*/
    resolve(parent,args) {
      return _.find(books,{id: args.id})// <-- this function is the function to
      //code to get data from db / other source
      // line 35 -
    }
    },
    author: {
      type: AuthorType,
      args: { id:{type: GraphQLID}},
      resolve(parent,args) {
        return _.find(authors, { id: args.id });
      }
    }
    //does not need to be wrapped in a func as it doesn't matter in root queries (order does not matter)
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})

