import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../../src/Queries/queries";
import BookDetails from "./BookDetails";
import AddBook from "./AddBook";
import styled from "styled-components";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  displayBooks = () => {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading Books...</div>;
    } else {
      return data.books.map(book => {
        return (
          <Book
            key={book.id}
            onClick={e => {
              this.setState({ selected: book.id });
            }}
          >
            {book.name}
          </Book>
        );
      });
    }
  };
  render() {
    return (
      <MainWrapper>
        <Books>{this.displayBooks()}</Books>
        <BookDetails bookId={this.state.selected} />
        <AddBook />
      </MainWrapper>
    );
  }
}

export default graphql(getBooksQuery)(BookList);

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 2em;
  min-height: 70%;
`;

export const Books = styled.div``;

const Book = styled.div`
  list-style-type: none;
  margin: 0.4em;
  border: 1px solid red;
  max-width: 200px;
  padding: 0.2em;
  min-height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
`;
