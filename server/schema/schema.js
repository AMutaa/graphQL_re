// define types, relationships between types
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const _ = require("lodash");
// data models to interact with mongoDb instance
const Book = require("../models/book");
const Author = require("../models/author");

// object types

//author type definition
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
        return Book.find({ authorId: parent.id });
      }
    }
  })
});

//book type definition
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId);
      }
    }
  })
});

// deciding which arguments should come along as we query for a book
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // return book based on id
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      // resolve function to get data from db/other source
      resolve(parent, args) {
        // return _.find(books, { id: args.id });
        return Book.findById(args.id);
      }
    },
    // return author based on id
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      }
    },
    // return a list of all books in db/other source
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find({});
      }
    }
  }
});

// Mutations for CRUD

// add an author to the database
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // add an author to the db
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        // use author from model
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    //add a book to the db
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        // use book from model
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
});

// export schema to be used in the express app endpoint def

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
// // dummyData
// var books = [
//   { name: "Rifle Fight", genre: "Thriller", id: "1", authorId: "3" },
//   { name: "Empire", genre: "Sci-FI", id: "2", authorId: "4" },
//   { name: "Fight Night", genre: "Fantasy", id: "3", authorId: "1" },
//   { name: "Mile High", genre: "Fantasy", id: "3", authorId: "4" },
//   { name: "More", genre: "Fantasy", id: "3", authorId: "3" },
//   { name: "Twenty Past Four", genre: "Fantasy", id: "3", authorId: "3" }
// ];

// var authors = [
//   { name: "Jon Grisham", age: 44, id: "1" },
//   { name: "Micheal Myers", age: 42, id: "4" },
//   { name: "Noble", age: 23, id: "3" }
// ];
