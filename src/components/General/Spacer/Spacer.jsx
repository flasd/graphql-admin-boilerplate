import React from 'react';
import PropTypes from 'prop-types';

export default function Spacer(props) {
  const { space } = props;

  return <div style={{ height: space, width: '100%' }} />;
}

Spacer.propTypes = {
  space: PropTypes.number.isRequired,
};
