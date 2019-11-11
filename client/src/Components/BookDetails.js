import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../Queries/queries";
import styled from "styled-components";
import { Books } from "./BookList";

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data;
    if (book) {
      return (
        <BookDetail>
          <h2>{book.name}</h2>
          <p>
            <span>Genre:</span>
            {book.genre}
          </p>

          <p>
            <span>By:</span>
            {book.author.name}
          </p>
          <p>All books by this author</p>
          <Books>
            {book.author.books.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </Books>
        </BookDetail>
      );
    } else {
      return <BookDetail>No book selected</BookDetail>;
    }
  }
  render() {
    return <MainWrapper>{this.displayBookDetails()}</MainWrapper>;
  }
}

// making a single query
export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);

const MainWrapper = styled.div``;
const BookDetail = styled.div``;
