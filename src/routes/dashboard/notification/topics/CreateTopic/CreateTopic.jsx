import React from 'react';
import { Field } from 'formik';
import Input from '../../../../../components/DataEntry/Input';

export default function CreateTopic() {
  return (
    <>
      <strong>
        ATENÇÃO: O nome do tópico é unico e não pode ser reutilizado.
      </strong>
      <br />
      <br />
      <Field component={Input} name="name" label="Nome" autoFocus />
    </>
  );
}
