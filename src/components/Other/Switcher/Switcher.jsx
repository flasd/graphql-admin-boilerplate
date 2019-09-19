import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

export default function Switcher(props) {
  const { routes, composePath, fallbackPath } = props;

  return (
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={`${composePath(route.path, props)}`}
          render={route.render}
          exact={!route.router}
        />
      ))}
      <Redirect to={composePath(fallbackPath)} replace />
    </Switch>
  );
}

Switcher.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired,
      router: PropTypes.bool,
    }),
  ).isRequired,
  fallbackPath: PropTypes.string.isRequired,
  composePath: PropTypes.func.isRequired,
};
