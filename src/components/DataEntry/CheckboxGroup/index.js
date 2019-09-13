import { withProps } from 'recompose';
import CheckboxGroup from './CheckboxGroup';

export default withProps((props) => {
  const { field, form: { setFieldValue } } = props;

  return ({
    id: `${field.name}-group-checkbox`.toLowerCase(),
    field: {
      ...field,
      onChange: (value) => setFieldValue(field.name, value),
    },
  });
})(CheckboxGroup);
