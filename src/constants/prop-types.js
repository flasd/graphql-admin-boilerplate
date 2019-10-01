import PropTypes from 'prop-types';

export const inputFieldPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
});

export const inputFormPropTypes = PropTypes.shape({
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
});

export const optionPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  }),
);

export const childrenPropTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.node,
  PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
  ),
]);

export const userPropTypes = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  photo: PropTypes.string,
});
