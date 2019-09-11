import { compose, lifecycle, withStateHandlers } from 'recompose';
import ApolloProvider from './ApolloProvider';

export function ready() {
  return (client) => ({
    client,
    loading: false,
  });
}

export function componentDidMount() {
  const { getClient, ready: readyCallback } = this.props;
  getClient(readyCallback);
}

export default compose(
  withStateHandlers({
    loading: true,
    client: null,
  }, {
    ready,
  }),
  lifecycle({
    componentDidMount,
  }),
)(ApolloProvider);
