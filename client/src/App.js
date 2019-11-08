import React from "react";
import BookList from "./Components/BookList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <div id="title">
          <h2>The Reading Collection</h2>
        </div>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
