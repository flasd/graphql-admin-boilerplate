import { withStateHandlers, compose, mapProps } from 'recompose';
import memoize from 'lodash.memoize';
import Menu from './Menu';

export const privateInitialState = {
  openKeys: [],
};

export const privateStateHandlers = {
  onOpenChange: ({ openKeys }) => (newOpenKeys) => {
    const { length } = newOpenKeys.filter((key) => key.includes('root:'));

    if (length > 1) {
      return {
        openKeys: newOpenKeys.filter((key) => !openKeys.includes(key)),
      };
    }

    return {
      openKeys: newOpenKeys,
    };
  },
};


export function privateInjectRoot(items) {
  return items.map((item) => ({ ...item, key: `root:${item.href}` }));
}

export const privateMemoizedInjectRoot = memoize(privateInjectRoot);

export function privateMapProps(props) {
  return {
    ...props,
    items: privateMemoizedInjectRoot(props.items),
  };
}

export default compose(
  withStateHandlers(privateInitialState, privateStateHandlers),
  mapProps(privateMapProps),
)(Menu);
