import React, { Component } from "react";
import { graphql } from "react-apollo";
import compose from "lodash.flowright";
import {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation
} from "../Queries/queries";
import styled from "styled-components";
import Select from "react-select";

class AddBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
    this.submitForm = this.submitForm.bind(this);
  }

  displayAuthors = () => {
    var data = this.props.getAuthorsQuery;
    console.log(this.props);
    if (data.loading) {
      return <option disabled>Loading authors...</option>;
    } else {
      return data.authors.map(author => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }
  render() {
    const data = this.props.getAuthorsQuery;
    const authors = data.loading
      ? []
      : data.authors.map(author => ({ value: author.id, label: author.name }));
    const selectStyles = {
      control: provided => ({
        ...provided,
        width: "250px",
        margin: "0.5em 0"
      })
    };

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Card>
          <form onSubmit={this.submitForm}>
            <div className="field">
              <label>Book name:</label>
              <Input
                type="text"
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Genre:</label>
              <Input
                type="text"
                onChange={e => this.setState({ genre: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Author:</label>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row"
                }}
              >
                <Select
                  placeholder="Select an author ..."
                  options={authors}
                  onChange={e => this.setState({ authorId: e.value })}
                  styles={selectStyles}
                />
                <div>
                  <Button>+</Button>
                </div>
              </div>
            </div>
          </form>
        </Card>
      </div>
    );
  }
}

// bind several queries to one component
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);

const Card = styled.div`
  text-align: left;
  width: 350px;
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  padding: 0.5em;
  border-radius: 3px;
`;

const Input = styled.input`
  height: 38px;
  width: 250px;
  margin: 0.5em 0;
  color: black;
  padding-left: 0.5em;
  outline: none;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background: dark-grey;
`;

const Button = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 100px;
  font-size: 1.1em;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  outline: none;
  background: green;
`;
