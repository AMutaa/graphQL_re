import React from "react";
import BookList from "./Components/BookList";
import AddBook from "./Components/AddBook";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import styled from "styled-components";

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});
function App() {
  return (
    <ApolloProvider client={client}>
      <MainWrapper>
        <Navbar>
          <h1>THE READING COLLECTION</h1>
        </Navbar>
        <BookList />
      </MainWrapper>
    </ApolloProvider>
  );
}

export default App;

const MainWrapper = styled.div`
  margin: 0;
  width: 70vw;
`;

const Navbar = styled.div`
  height: 30%;
`;
