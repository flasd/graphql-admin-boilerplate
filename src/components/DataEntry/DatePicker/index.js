import { lazy } from 'react';
import { withProps, compose } from 'recompose';
import moment from 'moment';
import withLoading from '../../HOC/withLoading';
import DatePickerShimmer from './DatePickerShimmer';

// its async because we load moment lang files inside and they are heavy-ish
const DatePicker = lazy(() => import('./DatePicker'));

export function privateInjectProps(props) {
  const { form, field } = props;
  const { name } = field;
  const { setFieldValue, setFieldTouched } = form;

  return {
    id: `${field.name}-datapicker-input`.toLowerCase(),
    format: props.format || 'DD/MM/YYYY',
    field: {
      ...field,
      onChange: (value) => setFieldValue(name, value ? value.toISOString() : ''),
      onBlur: () => setFieldTouched(name, true),
      value: field.value ? moment(field.value) : null,
    },
  };
}

export default compose(
  withLoading(DatePickerShimmer, { width: 240, height: 60 }),
  withProps(privateInjectProps),
)(DatePicker);
