import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

const AddBook = () => {
  // handle state
  const initalState = { name: "", genre: "", authorId: "" };
  const [bookState, setBookState] = useState(initalState);

  // handle output query
  const {
    loading: authorLoading,
    error: authorError,
    data: authorData
  } = useQuery(getAuthorsQuery);
  let output = null;
  authorError && (output = <option disabled>Something went wrong</option>);

  output = authorLoading ? (
    <option disabled>Loading authors...</option>
  ) : (
    authorData.authors.map((author, index) => (
      <option key={index} value={author.id}>
        {author.name}
      </option>
    ))
  );

  // handle change
  const handleChange = e => {
    setBookState({ ...bookState, [e.target.name]: e.target.value });
  };

  //handle book mutation query and submission
  const [addBook] = useMutation(addBookMutation);
  const handleSubmit = e => {
    e.preventDefault();
    addBook({
      variables: { ...bookState },
      refetchQueries: [{ query: getBooksQuery }]
    });

    // empty input fields
    // setBookState(initalState);
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Book name:</label>
        <input type="text" name="name" onChange={handleChange} />
      </div>
      <div className="field">
        <label htmlFor="genre">Genre:</label>
        <input type="text" name="genre" onChange={handleChange} />
      </div>
      <div className="field">
        <label htmlFor="author">Author:</label>
        <select name="authorId" onChange={handleChange}>
          <option>Select author</option>
          {output}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
