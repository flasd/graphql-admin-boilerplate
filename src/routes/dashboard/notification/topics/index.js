import { compose, withProps } from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { message } from 'antd';
import get from 'lodash.get';
import Topics from './Topics';
import withModal from '../../../../components/HOC/withModal';
import withSearch from '../../../../components/HOC/withSearch';

export const listTopicsQuery = gql`
  query listTopics($name: String) {
    listTopics(name: $name) {
      topics {
        id
        name
        deleteable
        createdAt
      }
      total
    }
  }
`;

export const deleteTopicMutation = gql`
  mutation deleteTopic($id: ID!) {
    deleteTopic(id: $id)
  }
`;


export function privateCreateTopic(props) {
  const { topics: { refetch }, deleteTopic } = props;

  return (topic) => ({
    ...topic,
    deleteTopic: async () => {
      await deleteTopic({ variables: { id: topic.id } });
      setTimeout(refetch, 100);
    },
  });
}

export function privateInjectProps($message, $privateCreateTopic, $privateHandleSearch) {
  return (props) => {
    const topics = get(props, ['topics', 'listTopics', 'topics'], []);
    const total = get(props, ['topics', 'listTopics', 'total'], 0);

    return {
      $message,
      dataSource: topics.map(($privateCreateTopic(props))),
      total,
      handleSearch: $privateHandleSearch,
    };
  };
}

export async function privateHandleSearch(event, previousValue, props) {
  const { topics } = props;

  const value = get(event, ['target', 'value'], event);

  try {
    await topics.refetch({ name: value });
  } catch (error) {
    // gulp
  }
}

export default {
  path: '/topicos',
  component: compose(
    withModal,
    graphql(listTopicsQuery, { name: 'topics', options: { fetchPolicy: 'network-first' } }),
    graphql(deleteTopicMutation, { name: 'deleteTopic' }),
    withProps(privateInjectProps(message, privateCreateTopic, privateHandleSearch)),
    withSearch('topicName', ''),
  )(Topics),
};
