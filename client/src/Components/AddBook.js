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
        margin: "0.5em 0",
        border: "none",
        outline: "none"
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
  width: 80%;
  display: flex;
  flex-direction: column;
  background: #dae6f1;
  padding: 0.5em;
  border-radius: 3px;
  height: 95%;
  margin: auto 1em;
  box-shadow: 0 10px 20px rgba(60, 60, 200, 0.1);
  background: linear-gradient(to right, #dae6f1, #f6f9fc);
`;

const Input = styled.input`
  height: 38px;
  color: #808080;
  width: 250px;
  margin: 0.5em 0;
  padding-left: 0.5em;
  outline: none;
  font-size: 1em;
  font-weight: 300;
  border: none;
  border-radius: 4px;
  background: dark-grey;
`;

const Button = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 100px;
  border: none;
  font-size: 1.1em;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  outline: none;
  background: #65e76b;
`;
