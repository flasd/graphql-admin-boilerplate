import { lazy } from 'react';
import { withProps, compose } from 'recompose';
import moment from 'moment';
import withLoading from '../../HOC/withLoading';
import TimePickerShimmer from './TimePickerShimmer';

// its async because we load moment lang files inside and they are heavy-ish
const TimePicker = lazy(() => import('./TimePicker'));

export const TIME_FORMATS = {
  COMPACT_24: 'HH:mm',
  LONG_24: 'HH:mm:ss',
  COMPACT_12: 'hh:mm a',
  LONG_12: 'hh:mm:ss a',
};

export function privateInjectProps(props) {
  const { form, field } = props;
  const { name } = field;
  const { setFieldValue, setFieldTouched } = form;

  return {
    id: `${field.name}-timepicker-input`.toLowerCase(),
    format: props.format || TIME_FORMATS.COMPACT_24,
    use12Hours: props.format && props.format.includes('a'),
    field: {
      ...field,
      onChange: (value) => setFieldValue(
        name,
        value ? value.toISOString() : '',
      ),
      onBlur: () => setFieldTouched(name, true),
      value: field.value ? moment(field.value) : null,
    },
  };
}

export default compose(
  withLoading(TimePickerShimmer, { width: 240, height: 60 }),
  withProps(privateInjectProps),
)(TimePicker);
