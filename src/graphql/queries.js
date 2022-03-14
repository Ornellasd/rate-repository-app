import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node{
          id
          name
          ownerName
          createdAt
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    me {
      id
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!){
    repository(id: $id) {
      id
      fullName
      url
    }
  }
`;