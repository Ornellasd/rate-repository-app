import { useContext } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';

import { AUTHENTICATE_USER } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE_USER);
  const authStorage = useContext(AuthStorageContext);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: {
          "username": username,
          "password": password
        }
      }   
    });

    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;