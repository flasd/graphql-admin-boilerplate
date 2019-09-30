import React from 'react';
import classnames from 'classnames';
import * as styles from './Paper.styles';
import { childrenPropTypes } from '../../../constants/prop-types';

export default function Paper(props) {
  const { children } = props;

  return <div className={classnames(styles.container, 'vh75')}>{children}</div>;
}

Paper.propTypes = {
  children: childrenPropTypes.isRequired,
};
