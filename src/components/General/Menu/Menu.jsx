import React from 'react';
import PropTypes from 'prop-types';
import { Menu as AntMenu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu, Item } = AntMenu;

export function renderMenuItem(item) {
  const {
    href,
    icon,
    label,
    key,
    subItems,
  } = item;

  const active = href === window.location.pathname;

  if (Array.isArray(subItems)) {
    const title = (
      <span>
        {icon && <Icon type={icon} />}
        <span>{label}</span>
      </span>
    );

    return (
      <SubMenu key={key || href} title={title} active={active}>
        {subItems.map(renderMenuItem)}
      </SubMenu>
    );
  }

  return (
    <Item key={key || href} active={active}>
      <Link to={href}>
        {icon && <Icon type={icon} />}
        <span>{label}</span>
      </Link>
    </Item>
  );
}

export default function Menu(props) {
  const {
    openKeys,
    onOpenChange,
    items,
    theme,
  } = props;

  return (
    <AntMenu
      theme={theme}
      openKeys={openKeys}
      mode="inline"
      onOpenChange={onOpenChange}
    >
      {items.map(renderMenuItem)}
    </AntMenu>
  );
}

export const menuSubItemPropTypes = PropTypes.shape({
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  subItems: PropTypes.arrayOf(PropTypes.object),
});

export const menuItemPropTypes = PropTypes.shape({
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  subItems: PropTypes.arrayOf(menuSubItemPropTypes),
});

Menu.propTypes = {
  openKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOpenChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(menuItemPropTypes).isRequired,
  theme: PropTypes.oneOf(['dark', 'light']),
};

Menu.defaultProps = {
  theme: 'light',
};
