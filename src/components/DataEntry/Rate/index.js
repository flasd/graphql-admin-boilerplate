import { withProps } from 'recompose';
import Rate from './Rate';


export function privateInjectProps(props) {
  const { form, field } = props;
  const { name } = field;
  const { setFieldValue, setFieldTouched } = form;

  return {
    id: `${field.name}-rate-input`.toLowerCase(),
    field: {
      ...field,
      onChange: (value) => setFieldValue(name, value),
      onBlur: () => setFieldTouched(name, true),
    },
  };
}

export default withProps(privateInjectProps)(Rate);
