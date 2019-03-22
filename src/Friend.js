import React from 'react';

const Friend = ({ name, avatar, online, onClick }) => (
  <div className={`Friend ${online ? 'online':'offline'}`} onClick={onClick}>
    <img className="Avatar" src={avatar} alt={name} />
    <div>
      <div>{name}</div>
      <div className="activity"></div>
    </div>
  </div>
);

export default Friend;
