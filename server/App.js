const express = require("express");
// express to understand graphql
const graphqlHTTP = require("express-graphql");
// access to the schema
const schema = require("./schema/schema");
// interact with mongoDb database
const mongoose = require("mongoose");
const cors = require("cors");
mongoose
  .connect(
    "mongodb+srv://amutaa:4878wert@cluster0-0972q.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to database"))
  .catch(err => console.log(err));
// app init
const app = express();

// allow  cross-origin requests
app.use(cors());

// endpoint
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));
app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
