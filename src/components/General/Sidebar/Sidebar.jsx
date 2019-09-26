import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { childrenPropTypes } from '../../../constants/prop-types';

const { Sider } = Layout;

export default function Sidebar(props) {
  const {
    children,
    collapsed,
    theme,
  } = props;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      theme={theme}
      collapsedWidth={window.innerWidth > 768 ? undefined : 0}
      trigger={null}
    >
      {children}
    </Sider>
  );
}

Sidebar.propTypes = {
  children: childrenPropTypes.isRequired,
  collapsed: PropTypes.bool.isRequired,
  theme: PropTypes.oneOf(['dark', 'light']),
};

Sidebar.defaultProps = {
  theme: 'light',
};
