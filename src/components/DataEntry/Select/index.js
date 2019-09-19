import { withProps, compose } from 'recompose';
import Select from './Select';
import withSearch from '../../HOC/withSearch';

export function privateInjectProps(props) {
  const { form, field } = props;
  const { name } = field;
  const { setFieldValue, setFieldTouched } = form;

  return {
    id: `${field.name}-select-input`.toLowerCase(),
    field: {
      ...field,
      onChange: (value) => setFieldValue(name, value),
      onBlur: () => setFieldTouched(name, true),
    },
  };
}

export default compose(
  withProps(privateInjectProps),
  withSearch('options'),
)(Select);
