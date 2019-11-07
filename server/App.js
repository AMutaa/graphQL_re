const express = require("express");
// express to understand graphql
const graphqlHTTP = require("express-graphql");
// access to the schema
const schema = require("./schema/schema");
// interact with mongoDb database
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://amutaa:4878wert@cluster0-0972q.mongodb.net/test?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});
// app init
const app = express();

// endpoint
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));
app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
