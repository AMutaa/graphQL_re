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
        const styled = {
          border: this.state.selected === book.id ? "1px solid #65e76b" : ""
        };
        return (
          <Book
            key={book.id}
            style={styled}
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
        <BookDetails
          styles={{ gridRow: "1/1", background: "green" }}
          bookId={this.state.selected}
        />
        <AddBook />
      </MainWrapper>
    );
  }
}

export default graphql(getBooksQuery)(BookList);

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2fr 1fr;
  grid-gap: 2em;
  min-height: 90%;
`;

export const Books = styled.ul`
  padding: 1.5em 0;
  max-height: 50vh;
  display: inline-block;
  overflow-y: scroll;
  margin: 0;
  text-align: left;
  grid-row: 1/2;
`;

const Book = styled.p`
  margin: 0.4em;
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
  min-width: 150px;
  min-height: 35px;
  text-align: center;
  background: white;
  padding: 0.5em;
  border-radius: 3px;
  cursor: pointer;
  display: inline-block;
  &:hover {
    transform: translateY(-2px);
  }
`;
