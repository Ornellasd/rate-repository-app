import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortPrinciple) => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  let sortVariables;

  switch(sortPrinciple) {
    case 'latest':
      sortVariables = {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC'
      };
      break;
    case 'highest':
      sortVariables = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC'
      };
      break;
    case 'lowest': 
      sortVariables = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC'
      };
      break;
  };

  const result = useQuery(GET_REPOSITORIES, {
    variables: sortVariables,
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