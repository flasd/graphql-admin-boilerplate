import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider } from 'antd';
import { Router } from 'react-router-dom';
import { AuthProvider } from 'fetch-auth-manager';
import { Helmet } from 'react-helmet';
import ApolloProvider from './components/Other/ApolloProvider';
import Routes from './routes';

export default function App(props) {
  const { locale, history, getClient } = props;

  return (
    <ApolloProvider getClient={getClient}>
      <AuthProvider>
        <ConfigProvider locale={locale}>
          <>
            <Helmet titleTemplate="%s • MyApp" defaultTitle="MyApp" />
            <Router history={history}>
              <Routes />
            </Router>
          </>
        </ConfigProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  locale: PropTypes.any.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  getClient: PropTypes.func.isRequired,
};
