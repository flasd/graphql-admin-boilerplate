import { lazy } from 'react';
import { withProps, compose } from 'recompose';
import moment from 'moment';
import withLoading from '../../HOC/withLoading';
import RangePickerShimmer from './RangePickerShimmer';

// its async because we load moment lang files inside and they are heavy-ish
const RangePicker = lazy(() => import('./RangePicker'));

export function privateParseValue(value) {
  if (Array.isArray(value)) {
    return value.map((date) => date.toISOString());
  }

  return '';
}

export function privateTransformValue(value) {
  if (Array.isArray(value)) {
    return value.map((dateString) => moment(dateString));
  }

  return value;
}

export function privateInjectProps(props) {
  const { form, field } = props;
  const { name } = field;
  const { setFieldValue, setFieldTouched } = form;

  return {
    id: `${field.name}-datapicker-input`.toLowerCase(),
    format: props.format || 'DD/MM/YYYY',
    field: {
      ...field,
      onChange: (value) => setFieldValue(name, privateParseValue(value)),
      onBlur: () => setFieldTouched(name, true),
      value: privateTransformValue(field.value),
    },
  };
}

export default compose(
  withLoading(RangePickerShimmer, { width: 240, height: 60 }),
  withProps(privateInjectProps),
)(RangePicker);
