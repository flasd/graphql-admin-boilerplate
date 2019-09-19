import get from 'lodash.get';
import { withProps } from 'recompose';
import Switcher from './Switcher';


export function composePath(path, props) {
  return `${get(props, ['match', 'path'], '')}/${path}`.replace(/\/{2,}/g, '/');
}

export default withProps({
  composePath,
})(Switcher);
