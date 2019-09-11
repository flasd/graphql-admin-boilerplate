import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

export default function Routes(props) {
  const { routes, fallbackPath } = props;

  return (
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          render={route.render}
          exact={!!route.exact}
        />
      ))}
      <Redirect to={fallbackPath} replace />
    </Switch>
  );
}

Routes.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired,
      exact: PropTypes.bool,
    }),
  ).isRequired,
  fallbackPath: PropTypes.string.isRequired,
};
