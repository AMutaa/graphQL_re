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
        <ListWrap>
          <div>
            <Books>{this.displayBooks()}</Books>
          </div>
          <div>
            <AddBook />
          </div>
        </ListWrap>
        <BookDetails bookId={this.state.selected} />
      </MainWrapper>
    );
  }
}

export default graphql(getBooksQuery)(BookList);

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 70%;
`;

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 50vh;
`;

export const Books = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-itemns: center;
`;

const Book = styled.li`
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
