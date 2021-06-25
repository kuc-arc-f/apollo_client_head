
import { gql} from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks($site_id : String!, $content_name : String!) {
    contents(site_id: $site_id , content_name: $content_name) {
      id
      name
      values
    }    
  }
`;
export const GET_TASK = gql`
  query GetTask($id: String!) {
    task(id: $id) {
      id
      title
    }
  }
`;
export const ADD_TASK = gql`
  mutation AddTask($title: String!) {
    addTask(title: $title) {
      id
      title
    }
  }
`;
export const UPDATE_TASK = gql`
  mutation UpdateTask($id: String!, $title : String!) {
    updateTask(id: $id, title: $title) {
      id
      title
    }
  }
`;
export const DELETE_TASK = gql`
  mutation RemoveTask ($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`;