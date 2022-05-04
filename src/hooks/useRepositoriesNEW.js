import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

import { GET_REPOSITORIES } from '../graphql/queries';

let num = 0;
const useRepositories = (queryVariables) => {
  console.log(queryVariables);
  num = num + 1;
  // console.log(`being called ${num} times`);
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
  });

  return { repositories: data, loading, refetch };
};

export default useRepositories;