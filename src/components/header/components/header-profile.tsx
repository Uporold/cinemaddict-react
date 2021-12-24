import React from "react";
import { useRank } from "../../../store/movie/hooks/selectors";
import { useLogout } from "../../../store/auth/hooks/useLogout";

interface Props {
  name: string;
}

export const HeaderProfile: React.FC<Props> = ({ name }) => {
  const userRank = useRank();
  const logout = useLogout();
  return (
    <section className="header__profile profile">
      <div className="profile__user">
        <div className="profile__user-info">
          <p className="profile__name">{name}</p>
          <p className="profile__rating">{userRank}</p>
        </div>
        <img
          className="profile__avatar"
          src="images/bitmap@2x.png"
          alt="Avatar"
          width="35"
          height="35"
        />
      </div>
      <button className="profile__logout" type="button" onClick={logout}>
        Logout
      </button>
    </section>
  );
};
