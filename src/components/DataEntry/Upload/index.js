import { withProps } from 'recompose';
import sum from 'lodash.sum';
import debounce from 'lodash.debounce';
import noop from 'lodash.noop';
import { converterBase2 } from 'byte-converter';
import readableBytes from 'readable-bytes';
import { message } from 'antd';
import Upload from './Upload';

export const BYTE_UNITS = {
  TERABYTE: 'TB',
  GIGABYTE: 'GB',
  MEGABYTE: 'MB',
  KILOBYTE: 'KB',
  BYTE: 'B',
};

export function getByteSize(value, unit) {
  return converterBase2(value, unit, 'B');
}

export const privateMessageError = debounce(message.error, 250);

export function privateCreateValidation(props) {
  const {
    accept, maxFileSize, maxListSize, multiple, directory,
  } = props;

  return (file, fileList) => {
    if ((multiple || directory) && maxListSize) {
      const listSize = sum(fileList.map((singleFile) => singleFile.size));

      if (listSize > maxListSize) {
        privateMessageError(`Tamanho dos arquivos excede ${readableBytes(maxListSize, null, 2)}`);
        return false;
      }
    }

    if (file.size > maxFileSize) {
      privateMessageError(`Tamanho do arquivo excede ${readableBytes(maxFileSize, null, 2)}`);
      return false;
    }

    if ((accept || []).length > 0 && !accept.includes(file.type)) {
      return false;
    }

    return true;
  };
}

export function privateInjectProps(props) {
  const { form, field } = props;
  const { name } = field;
  const { setFieldValue, setFieldTouched } = form;

  return {
    id: `${field.name}-upload-input`.toLowerCase(),
    validate: privateCreateValidation(props),
    accept: (props.accept || []).join(','),
    field: {
      ...field,
      onChange: (value) => {
        const { fileList } = value;
        const newValue = Array.from(fileList)
          .filter((file) => file.status)
          .filter((file) => file.status !== 'removed');

        setFieldValue(
          name,
          newValue,
        );

        if (!form.touched[name] && newValue.length > 0) {
          setFieldTouched(name, true);
        }
      },
      onBlur: noop,
    },
  };
}

export default withProps(privateInjectProps)(Upload);
