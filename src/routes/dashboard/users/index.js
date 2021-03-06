import gql from 'graphql-tag';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import get from 'lodash.get';
import noop from 'lodash.noop';
import Users from './Users';

export function privateInjectProps(props) {
  const totalUsers = get(props, ['data', 'listUsers', 'total'], 1);
  const refetch = get(props, ['data', 'refetch'], noop);
  const users = get(props, ['data', 'listUsers', 'docs'], [])
    .map((user) => ({ ...user, refetch }));

  return {
    totalUsers,
    users,
    handleUpdate: (pagination, filters, sorter) => {
      const { current } = pagination;
      const { order } = sorter;

      const filter = {};
      Object.entries(filters).forEach(([key, [value]]) => {
        if (key === 'email') {
          filter[`${key}Verified`] = value;
          return;
        }

        filter[key] = value;
      });

      props.data.refetch({
        page: current,
        order: order === 'descend' ? 'desc' : 'asc',
        filter,
      });
    },
  };
}

export const privateInitialVariables = {
  page: 1,
  order: 'asc',
  filters: {},
};


export const listUsersQuery = gql`
  query listUsers($page: Int!, $order: Order!, $filter: UserFilterInput) {
    listUsers(page: $page, order: $order, filter: $filter) {
      pages
      total
      docs {
        id
        photo
        name
        email
        emailVerified
        source
        role
      }
    }
  }
`;

export default {
  path: '/usuarios',
  component: compose(
    graphql(listUsersQuery, { options: { variables: privateInitialVariables } }),
    withProps(privateInjectProps),
  )(Users),
};
