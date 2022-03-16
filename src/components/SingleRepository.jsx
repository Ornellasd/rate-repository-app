import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

import ReviewList from './ReviewList';

const SingleRepository = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) return null;
  if (error) console.log(`ERROR!: ${error}`);

  return <ReviewList id={id} repository={data.repository} />;
};

export default SingleRepository;