import React, { Suspense } from 'react';
import { compose, withProps } from 'recompose';
import ContentLoader from 'react-content-loader';
import withRenderDelay from '../delayRender';
import wrapIn from '../wrapIn';

export function getFallback(Component, styles, delay) {
  return React.createElement(
    withRenderDelay(delay)(ContentLoader),
    { width: 100, height: 100, style: { ...styles } },
    React.createElement(Component),
  );
}

const defaultStyles = { width: 100, height: 100 };

export default function withLoading(LoadingComponent, userStyles, delay = 255) {
  const styles = {
    ...defaultStyles,
    ...userStyles,
  };

  return compose(
    withProps({
      fallback: getFallback(LoadingComponent, styles, delay),
    }),
    wrapIn(Suspense),
  );
}
