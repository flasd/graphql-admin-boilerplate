import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider as Raw } from 'react-apollo';

export default function ApolloProvider(props) {
  const { loading, client, children } = props;

  if (loading) {
    return null;
  }

  return <Raw client={client}>{children}</Raw>;
}

ApolloProvider.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  client: PropTypes.objectOf(PropTypes.any),
};

ApolloProvider.defaultProps = {
  client: null,
};
