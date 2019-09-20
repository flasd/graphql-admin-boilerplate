import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { RetryLink } from 'apollo-link-retry';
import { getMainDefinition } from 'apollo-utilities';
import QueueLink from 'apollo-link-queue';
import { createWsParams, createAuthManagerLink } from 'fetch-auth-manager';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT;

export function handleErrors({ graphQLErrors, networkError }) {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV) {
    /* eslint-disable no-console */
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ));
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
    /* eslint-enable no-console */
  }
}

export const retryWhitelist = [];

export async function getClient(cb) {
  const cache = new InMemoryCache();

  await persistCache({
    cache,
    storage: window.localStorage,
  });

  const retry = new RetryLink({
    attempts: {
      max: Infinity,
      retryIf: (e, { operationName }) => retryWhitelist.includes(operationName),
    },
  });
  const offlineLink = new QueueLink();

  const wsLink = new WebSocketLink({
    uri: GRAPHQL_ENDPOINT.replace(/^http/, 'ws'),
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: createWsParams(),
    },
  });

  if (navigator.onLine) {
    offlineLink.open();
  } else {
    offlineLink.close();
  }

  document.body.addEventListener('online', () => {
    offlineLink.open();
  });

  document.body.addEventListener('offline', () => {
    offlineLink.close();
  });

  const errorHandler = onError(handleErrors);

  const managerLink = createAuthManagerLink();


  const http = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
    credentials: 'include',
    fetchOptions: {
      credentials: 'include',
    },
  });

  const httpLink = ApolloLink.from([errorHandler, offlineLink, retry, managerLink, http]);

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition'
        && definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  cb(
    new ApolloClient({
      link,
      cache,
    }),
  );
}
