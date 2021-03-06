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
  query users($offset: Int!, $limit: Int!) {
    users(pageInfo: { offset: $offset, limit: $limit }) {
      count
      pageInfo {
        offset
        limit
      }
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

export const ADD_USER = gql`
  mutation createUser($name: String!, $email: String!, $phone: String!, $birthDate: Date!) {
    createUser(data: { name: $name, email: $email, phone: $phone, birthDate: $birthDate, role: user }) {
      id
      name
      phone
      birthDate
      email
      role
    }
  }
`;

export const USER_DETAILS = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      name
      phone
      birthDate
      email
      role
    }
  }
`;
