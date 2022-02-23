import { useContext } from 'react';
import { useMutation } from '@apollo/client';

import { AUTHENTICATE_USER } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE_USER);
  const authStorage = useContext(AuthStorageContext);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: {
          "username": username,
          "password": password
        }
      }   
    });

    await authStorage.setAccessToken(response.data.authenticate.accessToken);
  };

  return [signIn, result];
};

export default useSignIn;