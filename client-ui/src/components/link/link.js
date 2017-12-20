import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const Link = ({ url, label, icon }) => {
  console.log(url, label, icon)
  return (
    <a href={url}>
      {icon && <Icon name={icon} />}
      {label}
    </a>);
}

export default Link;