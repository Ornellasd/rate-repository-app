import Text from './Text';

import { useParams } from 'react-router-native';

import useRepository from '../hooks/useRepository';

import ReviewList from './ReviewList';

const SingleRepository = ({ route }) => {
  const { itemId } = route.params;

  const data = useRepository(itemId);

  return <ReviewList repository={data.repository} />;
};

export default SingleRepository;