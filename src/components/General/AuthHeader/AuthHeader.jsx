import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import * as styles from './AuthHeader.styles';

const { Title } = Typography;

export default function AuthHeader(props) {
  const { title, subTitle } = props;

  return (
    <div>
      <Title level={2}>{title}</Title>
      <span className={styles.subheader}>{subTitle}</span>
    </div>
  );
}

AuthHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};
