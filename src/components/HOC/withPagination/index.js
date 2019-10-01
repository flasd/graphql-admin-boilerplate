import { compose, withProps } from 'recompose';
import { graphql } from 'graphql';

export function createHandlers(operationName) {
  return (pagination, filters, sorts) => {

  }
}

export function privateInjectHandler(operationName, transforms) {
  const {
    transformPagination,
    transformFilters,
    transformSorts,
  } = transforms;

  return () => ({

  });
}

export default function withPagination(operation, transforms = {}) {
  const {
    tag,
    config = {},
  } = operation;

  const { name = 'data' } = config;


  return compose(
    graphql(tag, config),
    withProps(privateInjectHandler(name, transforms))
  );
}
handleUpdate: (pagination, filters, sorter) => {
  const { current } = pagination;
  const { order } = sorter;

  const filter = {};
  Object.entries(filters).forEach(([key, [value]]) => {
    if (key === 'email') {
      filter[`${key}Verified`] = value;
      return;
    }

    filter[key] = value;
  });

  props.data.refetch({
    page: current,
    order: order === 'descend' ? 'desc' : 'asc',
    filter,
  });
