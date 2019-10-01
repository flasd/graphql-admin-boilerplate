import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Typography, Button } from 'antd';
import * as styles from './PageHeader.styles';
import Breadcrumbs from '../../Navigation/Breadcrumbs';
import { breadcrumItemPropTypes } from '../../Navigation/Breadcrumbs/Breadcrumbs';

const { Title } = Typography;

export default function PageHeader(props) {
  const { title, breadcrumbs, action } = props;

  return (
    <div className={styles.container}>
      <Helmet title={title} />
      <div className={styles.flexer}>
        <div className={styles.mainContent}>
          <Title level={3} className={styles.title}>
            {title}
          </Title>
          {breadcrumbs.length > 0 && (
            <div className={styles.children}>
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}
        </div>
        {action && (
          <div style={{ marginTop: breadcrumbs.length > 0 ? 16 : 0 }}>
            <Button
              type={action.type}
              disabled={action.disabled}
              onClick={action.fn}
            >
              {action.label}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(breadcrumItemPropTypes),
  action: PropTypes.shape({
    type: PropTypes.oneOf([
      'primary',
      'ghost',
      'dashed',
      'danger',
      'link',
      'default',
      '',
    ]),
    label: PropTypes.string.isRequired,
    fn: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  }),
};

PageHeader.defaultProps = {
  breadcrumbs: [],
  action: null,
};
