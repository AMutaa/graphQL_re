import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../Queries/queries";
import styled from "styled-components";

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data;
    if (book) {
      return (
        <BookDetail>
          <h4>{book.name}</h4>
          <p>
            <span>By : </span>
            <span
              style={{
                fontStyle: "italic",
                fontSize: "1.1em",
                textDecoration: "underline",
                color: "#6772e4"
              }}
            >
              {book.author.name}
            </span>
          </p>
          <p style={{ fontSize: "0.8em" }}>
            <span>Genre: </span>
            <span>{book.genre}</span>
          </p>
          <p>All books by this author</p>
          <ul>
            {book.author.books.map(item => (
              <li
                style={{ listStyleType: "circle", fontSize: "0.9em" }}
                key={item.id}
              >
                {item.name}
              </li>
            ))}
          </ul>
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

const MainWrapper = styled.div`
  grid-row: 1/-1;
  border-left: 5px solid #dae6f1;
  border-color: linear-gradient(red, blue);
`;
const BookDetail = styled.div`
  max-height: 40vh;
  text-align: left;
  padding: 2.5em 0.4em;
  margin-bottom: 0.4em;
`;
