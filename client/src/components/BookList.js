import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBooksQuery } from "../queries/queries";

// components
import BookDetails from "./BookDetails";

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selected, setSelected] = useState(null);

  let output = null;
  error && (output = <div>Something went wrong</div>);

  output = loading ? (
    <div>Loading books...</div>
  ) : (
    data.books.map((book, index) => (
      <li key={index} onClick={() => setSelected(book.id)}>
        {book.name}
      </li>
    ))
  );

  return (
    <div>
      <ul id="book-list">{output}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default BookList;
