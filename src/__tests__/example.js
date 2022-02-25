import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

import { RepositoryListContainer } from '../components/RepositoryList';



// const Greeting = ({ name }) => {
//   return (
//     <View>
//       <Text>Hello {name}!</Text>
//     </View>
//   );
// };

// describe('Greeting', () => {
//   it('renders a greeting message based on the name prop', () => {
//     const { debug, getByText } = render(<Greeting name="Kalle" />);

//     debug();

//     expect(getByText('Hello Kalle!')).toBeDefined();
//   });
// });

// const RepositoryItem = ({ item }) => {
//   // ...

//   return (
//     <View testID="repositoryItem" {/* ... */}>
//       {}
//     </View>
//   )
//};

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // const { debug, getByText } = render(<Greeting name="Kalle" />);
      const { debug, getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      const repositoryItemInfo = getAllByTestId('repositoryInfo');
      const repositoryItemMetrics = getAllByTestId('repositoryMetrics')

      const [firstRepoInfo, secondRepoInfo] = repositoryItemInfo;



      console.log(repositoryItems);
      // expect(firstRepositoryItem).toHaveTextContent(repositories.edges[0].node.fullName);
      // console.log(repositories.edges[0].node.fullName);
      // debug();

      // expect(firstRepositoryItem).toHaveTextContent(repositories.edges[0].node.fullName);


    });
  });
});