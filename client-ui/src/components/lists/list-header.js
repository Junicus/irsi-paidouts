import React from 'react';
import { Header, Segment, Table as SUITable } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ListHeader = ({ title, rightCommands }) => {
  console.log(rightCommands);
  const renderRightCommands = (commands) => {
    return commands.map((command) => {
      return (<a key={command.label} href={command.url}>{command.label}</a>);
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      <div>
        {title}
      </div>
      <div>
        {rightCommands && <div>{renderRightCommands(rightCommands)}</div>}
      </div>
    </div>
  );
}

export default ListHeader;