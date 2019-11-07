// define types, relationships between types
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql;
const _ = require("lodash");

// dummyData
var books = [
  { name: "Rifle Fight", genre: "Thriller", id: "1" },
  { name: "Empire", genre: "Sci-FI", id: "2" },
  { name: "Fight Night", genre: "Fantasy", id: "3" }
];

var authors = [
  { name: "Jon Grisham", age: 44, id: "1" },
  { name: "Micheal Myers", age: 42, id: "4" },
  { name: "Jo Frazier", age: 23, id: "3" }
];

// object types
//book
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

//author
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// deciding which arguments should come along as we query for a book
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db/other source
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
