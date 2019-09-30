import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';
import * as styles from './PageHeader.styles';
import Breadcrumbs from '../../Navigation/Breadcrumbs';
import { breadcrumItemPropTypes } from '../../Navigation/Breadcrumbs/Breadcrumbs';

const { Title } = Typography;

export default function PageHeader(props) {
  const { title, breadcrumbs } = props;
  return (
    <div className={styles.container}>
      <Helmet title={title} />
      <Title level={3} className={styles.title}>
        {title}
      </Title>
      {breadcrumbs.length > 0 && (
        <div className={styles.children}>
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(breadcrumItemPropTypes),
};

PageHeader.defaultProps = {
  breadcrumbs: [],
};
