import { withProps, compose, withStateHandlers } from 'recompose';
import AutoComplete from './AutoComplete';

export const SEARCH_MODES = {
  EQUALS: 'eq',
  START_WITH: 'sw',
  END_WITH: 'ew',
  CONTAINS: 'c',
  NOT_EQUALS: 'neq',
  NOT_START_WITH: 'nsw',
  NOT_END_WITH: 'new',
  NOT_CONTAINS: 'nc',
  CUSTOM: 'cu',
  PASSTHROUGH: 'ps',
};

function filter(dataSource, value, searchMode, filterFn) {
  if (!value || value.length === 0) {
    return dataSource;
  }

  switch (searchMode) {
    case SEARCH_MODES.EQUALS:
      return dataSource.filter((item) => item === value);

    case SEARCH_MODES.START_WITH:
      return dataSource.filter((item) => `${item}`.startsWith(value));

    case SEARCH_MODES.END_WITH:
      return dataSource.filter((item) => `${item}`.endsWith(value));

    case SEARCH_MODES.CONTAINS:
      return dataSource.filter((item) => `${item}`.includes(value));

    case SEARCH_MODES.NOT_EQUALS:
      return dataSource.filter((item) => item !== value);

    case SEARCH_MODES.NOT_START_WITH:
      return dataSource.filter((item) => !`${item}`.startsWith(value));

    case SEARCH_MODES.NOT_END_WITH:
      return dataSource.filter((item) => !`${item}`.endsWith(value));

    case SEARCH_MODES.NOT_CONTAINS:
      return dataSource.filter((item) => !`${item}`.includes(value));

    case SEARCH_MODES.CUSTOM:
      return filterFn(dataSource, value);

    case SEARCH_MODES.PASSTHROUGH:
    default:
      return dataSource;
  }
}

function onSearch(state, props) {
  const { searchMode = SEARCH_MODES.PASSTHROUGH, dataSource } = props;

  return (value) => ({
    options: filter(dataSource, value, searchMode),
  });
}

export default compose(
  withStateHandlers((props) => ({ options: props.dataSource }), {
    onSearch,
  }),
  withProps((props) => {
    const { form, field } = props;
    const { name } = field;
    const { setFieldValue } = form;

    return {
      id: `${field.name}-autocomplete-input`.toLowerCase(),
      field: {
        ...field,
        onChange: (value) => setFieldValue(name, value),
      },
    };
  }),
)(AutoComplete);
