import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as styles from './Paper.styles';
import { childrenPropTypes } from '../../../constants/prop-types';

export default function Paper(props) {
  const { children, padding } = props;

  return (
    <div className={classnames(styles.container, { [styles.padding]: padding })}>{children}</div>
  );
}

Paper.propTypes = {
  children: childrenPropTypes.isRequired,
  padding: PropTypes.bool,
};

Paper.defaultProps = {
  padding: false,
};
