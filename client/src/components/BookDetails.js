import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: bookId },
    skip: !bookId
  });

  // handle html output
  let output = null;
  error && (output = <div>Something went wrong</div>);

  if (data) {
    const { name, genre, author } = data.book;

    output = loading ? (
      <div>Loading details...</div>
    ) : (
      <div>
        <h2>{name}</h2>
        <p>{genre}</p>
        <p>
          <em>{author.name}</em>
        </p>
        <p>
          Other books by <em>{author.name}</em>
        </p>
        <ul className="other-books">
          {author.books.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  return <div id="book-details">{output}</div>;
};

export default BookDetails;
