import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { wrapDisplayName } from 'recompose';

export default function wrapIn(OuterComponent) {
  return (InnerComponent) => {
    function ViewComponent(props) {
      return React.createElement(
        OuterComponent,
        props,
        React.createElement(
          InnerComponent,
          props,
        ),
      );
    }

    ViewComponent.displayName = wrapDisplayName(ViewComponent, 'wrapIn');

    hoistNonReactStatic(ViewComponent, InnerComponent);
    hoistNonReactStatic(ViewComponent, OuterComponent);

    return ViewComponent;
  };
}
