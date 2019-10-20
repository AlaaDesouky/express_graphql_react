import { gql } from "apollo-boost";

// get authors query from server
const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

// get books query from server
const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

// get books query from server
const getBookQuery = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

// add book query to server
const addBookMutation = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, getBookQuery, addBookMutation };
