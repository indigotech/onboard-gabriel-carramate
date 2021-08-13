import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        id
        name
        phone
        birthDate
        email
        role
      }
    }
  }
`;

export const GET_USERS = gql`
  query users {
    users(pageInfo: { offset: 0, limit: 1000 }) {
      nodes {
        id
        name
        phone
        birthDate
        email
        role
      }
    }
  }
`;
