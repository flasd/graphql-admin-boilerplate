import React, { Suspense } from 'react';
import { compose, withProps } from 'recompose';
import ContentLoader from 'react-content-loader';
import withRenderDelay from 'react-delay-render';
import wrapIn from '../wrapIn';

export function getFallback(Component, delay = 225) {
  return React.createElement(
    withRenderDelay({ delay })(ContentLoader),
    {},
    React.createElement(Component),
  );
}

export default function withLoading(LoadingComponent) {
  return compose(
    withProps({
      fallback: getFallback(LoadingComponent),
    }),
    wrapIn(Suspense),
  );
}
