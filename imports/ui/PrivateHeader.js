import  React  from 'react';
import { Accounts } from 'meteor/accounts-base';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';


const PrivateHeader = (props) => {
  const onLogout = () => {
    Accounts.logout();
  }

  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PrivateHeader
