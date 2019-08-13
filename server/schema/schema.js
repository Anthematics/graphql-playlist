const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID , GraphQLInt} = graphql;
const _ = require('lodash');

// root queries are how we init
//this is all relational

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    // authors: [Author!]!
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    // books: [Book!]!
  })
})

const RootQuery = new GraphQLObjectType ({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: {type: GraphQLID}}, // <--- Pass an id to graph ql when looking for an id - it should be a string
      // you'll need to pass args because otherwise you wont know WHICH book.
    resolve(parent,args) {

      _find(books,{id: args.id}// <-- this function is the function to
      //code to get data from db / other source
      // line 35 -
    }
    }
    //does not need to be wrapped in a func as it doesn't matter in root queries (order does not matter)
  }
})

module.export = new GraphQLSchema({
  query: RootQuery
})

