import * as yup from 'yup';
import deburr from 'lodash.deburr';

export function privateEqualsTo(path, errorMessage) {
  const ref = yup.ref(path);

  return yup.mixed().test({
    name: 'equalsTo',
    exclusive: false,
    // eslint-disable-next-line no-template-curly-in-string
    message: errorMessage || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path,
    },
    test(value) {
      return value === this.resolve(ref);
    },
  });
}

yup.addMethod(yup.string, 'equalsTo', privateEqualsTo);

export function privateValidateFullName(value) {
  return /^[\w ]+$/.test(deburr(value));
}

export function privateValidateCheckboxChecked(value) {
  return value === true;
}

// Public interface

export function makeSchema(shape) {
  return yup.object().strict().shape(shape);
}

export function makeRequired(field, message = 'Campo obrigatório!') {
  return field.required(message);
}

export const nameRule = yup.string().matches(/^\w+$/, 'Use apenas seu primeiro nome!');
export const fullNameRule = yup.string().test('fullName', 'Nome inválido!', privateValidateFullName);
export const emailRule = yup.string().email('E-mail inválido!');
export const passwordRule = yup.string().min(5, 'Senha inválida!');
export const confirmPasswordRule = yup.string().equalsTo('password', 'Senhas não são iguais!');
export const tosRule = yup.bool().test(
  'checkboxTrue',
  'Você precisa marcar o campo acima para continuar!',
  privateValidateCheckboxChecked,
);
