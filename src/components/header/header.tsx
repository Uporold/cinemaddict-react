import React from "react";

const Header: React.FC = (): JSX.Element => {
  return (
    <header className="header">
      <h1 className="header__logo logo">Cinemaddict</h1>
      <section className="header__profile profile">
        <p className="profile__rating">Dungeon Master</p>
        <img
          className="profile__avatar"
          src="images/bitmap@2x.png"
          alt="Avatar"
          width="35"
          height="35"
        />
      </section>
    </header>
  );
};

export default Header;
