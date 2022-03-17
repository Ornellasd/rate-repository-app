import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(false);

  const result = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });

  const fetchRepository = () => {
    setLoading(true);

    if(result.data) {
      setRepository(result.data.repository);
      setLoading(false);
    }
  };

  useEffect(fetchRepository, [result]);

  return { repository, loading, refetch: fetchRepository };
}

export default useRepository;