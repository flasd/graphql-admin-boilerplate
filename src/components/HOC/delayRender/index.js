import React, { Component } from 'react';
import hoinstNonReactStatics from 'hoist-non-react-statics';
import { wrapDisplayName } from 'recompose';

export default function delayRender(delay = 225) {
  function enhancer(UserComponent) {
    class Delay extends Component {
      constructor(props) {
        super(props);

        this.state = {
          ready: false,
        };
      }

      componentDidMount() {
        this.timeout = setTimeout(() => {
          this.setState({ ready: true }, () => {
            this.timeout = null;
          });
        }, delay);
      }

      componentWillUnmount() {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
      }

      render() {
        const { ready } = this.state;

        return ready ? React.createElement(UserComponent, this.props) : null;
      }
    }

    hoinstNonReactStatics(Delay, UserComponent);

    Delay.displayName = wrapDisplayName(UserComponent, 'delayed');

    return Delay;
  }

  return enhancer;
}
