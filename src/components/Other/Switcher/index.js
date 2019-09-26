import get from 'lodash.get';
import { withProps } from 'recompose';
import sortBy from 'lodash.sortby';
import memoize from 'lodash.memoize';
import { message } from 'antd';
import Switcher from './Switcher';


export function composePath(path, props) {
  if (typeof props === 'string') {
    return `${props}/${path}`.replace(/\/{2,}/g, '/');
  }

  return `${get(props, ['match', 'path'], '')}/${path}`.replace(/\/{2,}/g, '/');
}

export function privateExtractParamCount(route) {
  return (route.path.match(/:/g) || []).length;
}

export function privateSortRoutes(routes) {
  const routers = routes.filter((route) => route.router);
  const otherRoutes = routes.filter((route) => !route.router);

  const sortedRouters = sortBy(routers, ['path.length']).reverse();
  const sortedOtherRoutes = sortBy(otherRoutes, ['path.length', privateExtractParamCount]).reverse();

  const finalRoutes = [
    ...sortedRouters,
    ...sortedOtherRoutes,
  ];

  if (process.env.NODE_ENV === 'development') {
    finalRoutes.forEach((route) => {
      /* eslint-disable no-console */
      if (route.render && route.render.toString().includes('=>')) {
        console.warn(`Don't use arrow functions in render methods!\n Problem in ${route.path} route definition.`);
      }

      if (route.component && route.component.toString().includes('=>')) {
        console.warn(`Don't use arrow functions in component definitions!\n Problem in ${route.path} route definition.`);
      }
      /* eslint-enable */
    });
  }

  return finalRoutes;
}

export const privateMemoizedSortRoutes = memoize(privateSortRoutes);

export function privateInjectProps($message) {
  return (props) => ({
    composePath,
    routes: privateMemoizedSortRoutes(props.routes),
    message: $message,
  });
}

export default withProps(privateInjectProps(message))(Switcher);
