import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (queryVariables) => {
  // console.log(queryVariables);

  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const result = useQuery(GET_REPOSITORIES, {
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
  });

  const fetchRepositories = () => {
    setLoading(true);

    if(result.data) {
      setRepositories(result.data.repositories);
      setLoading(false);
    }
  };

  useEffect(fetchRepositories, [result]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;