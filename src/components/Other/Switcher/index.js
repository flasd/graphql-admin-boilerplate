import get from 'lodash.get';
import { withProps } from 'recompose';
import Switcher from './Switcher';


export function composePath(path, props) {
  if (typeof props === 'string') {
    return `${props}/${path}`.replace(/\/{2,}/g, '/');
  }

  return `${get(props, ['match', 'path'], '')}/${path}`.replace(/\/{2,}/g, '/');
}

export default withProps({
  composePath,
})(Switcher);
