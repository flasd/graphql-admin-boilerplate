import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Breadcrumb as AntBreadcrumb, Icon } from 'antd';

const { Item } = AntBreadcrumb;

export function renderItem(item, index, { length }) {
  const {
    href, icon, label, key,
  } = item;

  if (index === length - 1 || !href) {
    return (
      <Item key={href || key}>
        {icon && <Icon type={icon} />}
        <span>{label}</span>
      </Item>
    );
  }

  return (
    <Item key={href || key}>
      <Link to={href}>
        {icon && <Icon type={icon} />}
        <span>{label}</span>
      </Link>
    </Item>
  );
}

export default function Breadcrumbs(props) {
  const { items } = props;

  return <AntBreadcrumb>{items.map(renderItem)}</AntBreadcrumb>;
}

export const breadcrumItemPropTypes = PropTypes.shape({
  href: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
});

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(breadcrumItemPropTypes).isRequired,
};
