import React from 'react';
import './Header.css';
import { compose } from 'redux';
import { withRouter } from 'react-router';

function Header(props) {
  const {
    history: { push },
  } = props;

  const redirectProject = () => {
    push('/project');
  };

  const redirectTeam = () => {
    push('/team');
  };

  return (
    <>
      <div className="header-wrapper">
        <div className="header-item" onClick={redirectProject}>
          Devops in a box
        </div>
        <div className="header-item" onClick={redirectProject}>
          Project Mgmt
        </div>
        <div className="header-item" onClick={redirectTeam}>
          Team Mgmt
        </div>
      </div>
    </>
  );
}

export default compose(withRouter)(Header);
