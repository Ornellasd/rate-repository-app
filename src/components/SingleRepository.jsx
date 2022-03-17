import { useParams } from 'react-router-native';

import useRepository from '../hooks/useRepository';

import ReviewList from './ReviewList';

const SingleRepository = () => {
  const { id } = useParams();

  const data = useRepository(id);

  return <ReviewList repository={data.repository} />;
};

export default SingleRepository;