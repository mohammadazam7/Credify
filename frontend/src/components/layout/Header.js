import React from 'react';

const Header = ({ title, subTitle }) => {
  return (
    <header>
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </header>
  );
};

export default Header;
