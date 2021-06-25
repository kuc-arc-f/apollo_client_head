
import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
  mutation AddbooksMutation($title: String!, $author: String) {
    Addbooks(title: $title, author: $author) {
      id
    }
  }
`;
