import memoize from 'lodash.memoize';
import shortId from 'shortid';
import { withProps } from 'recompose';
import Breadcrumbs from './Breadcrumbs';

export function privateInjectKeys(items) {
  return items.map((item) => ({ ...item, key: item.href || shortId.generate() }));
}

export const privateMemoizedInjectKeys = memoize(privateInjectKeys);

export function privateInjectProps(props) {
  return {
    items: privateMemoizedInjectKeys(props.items),
  };
}

export default withProps(privateInjectProps)(Breadcrumbs);
