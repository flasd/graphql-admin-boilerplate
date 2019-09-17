import { withProps } from 'recompose';
import CheckboxGroup from './CheckboxGroup';

export function privateInjectProps(props) {
  const { field, form: { setFieldValue } } = props;

  return ({
    id: `${field.name}-group-checkbox`.toLowerCase(),
    field: {
      ...field,
      onChange: (value) => setFieldValue(field.name, value),
    },
  });
}

export default withProps(privateInjectProps)(CheckboxGroup);
