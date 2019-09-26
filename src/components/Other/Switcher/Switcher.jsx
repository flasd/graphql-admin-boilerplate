import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

export function WarnAndRedirect(props) {
  const { fallbackPath, warning, message } = props;

  if (warning) {
    message.warning(warning);
  }

  return <Redirect to={fallbackPath} replace />;
}

WarnAndRedirect.propTypes = {
  fallbackPath: PropTypes.string.isRequired,
  warning: PropTypes.string,
  message: PropTypes.shape({
    warning: PropTypes.func.isRequired,
  }).isRequired,
};

WarnAndRedirect.defaultProps = {
  warning: '',
};

export default function Switcher(props) {
  const {
    routes,
    composePath,
    fallbackPath,
    fallbackWarning,
    message,
  } = props;

  return (
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={`${composePath(route.path, props)}`}
          component={route.component}
          render={route.render}
          exact={!route.router}
        />
      ))}
      <WarnAndRedirect
        fallbackPath={composePath(fallbackPath)}
        warning={fallbackWarning}
        message={message}
      />
    </Switch>
  );
}

Switcher.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      render: PropTypes.func,
      component: PropTypes.func,
      router: PropTypes.bool,
    }),
  ).isRequired,
  fallbackPath: PropTypes.string.isRequired,
  composePath: PropTypes.func.isRequired,
  fallbackWarning: PropTypes.string,
  message: PropTypes.objectOf(PropTypes.any).isRequired,
};

Switcher.defaultProps = {
  fallbackWarning: '',
};
