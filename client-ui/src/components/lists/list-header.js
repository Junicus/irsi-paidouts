import React from 'react';
import { Header, Segment, Table as SUITable } from 'semantic-ui-react';
import Link from '../link/link';

const ListHeader = ({ title, rightCommands }) => {
  const renderRightCommands = (commands) => {
    console.log(commands);
    return commands.map((command) => {
      return (<div key={command.url}><Link {...command} /></div>);
    });
  };

  const styles = {
    outerBox: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }

  return (
    <div style={styles.outerBox}>
      <div>
        {title}
      </div>
      {
        rightCommands &&
        <div>
          {renderRightCommands(rightCommands)}
        </div>
      }
    </div>
  );
}

export default ListHeader;