import { gql } from '@apollo/client';

// export const AUTHENTICATE_USER = gql`
//   mutation {
//     authenticate(credentials: { $username: String!, $password: String! }) {
//       accessToken
//     }
//   }
// `;

export const AUTHENTICATE_USER = gql`
  mutation authenticateUser($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;