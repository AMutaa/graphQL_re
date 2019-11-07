// define types, relationships between types
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const _ = require("lodash");

// dummyData
var books = [
  { name: "Rifle Fight", genre: "Thriller", id: "1" },
  { name: "Empire", genre: "Sci-FI", id: "2" },
  { name: "Fight Night", genre: "Fantasy", id: "3" }
];

// object types
//book
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

// deciding which arguments should come along as we query for a book
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db/other source
        return _.find(books, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
