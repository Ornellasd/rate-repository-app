import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (queryVariables) => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
  });

  // console.log(data);
  return { repositories: data.repositories, loading, refetch };
};

export default useRepositories;