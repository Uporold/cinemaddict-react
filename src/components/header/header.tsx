import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { PagePath } from "../../const";
import { HeaderProfile } from "./components/header-profile";
import { useStore } from "../../store";

interface Props {
  isMain?: boolean;
  headerText?: string;
}

const defaultProps: Props = {
  isMain: true,
  headerText: "",
};

export const Header: React.FC<Props> = observer(
  ({ isMain = true, headerText = "" }): JSX.Element => {
    const {
      authStore: { authorizationStatus, user },
    } = useStore();
    return (
      <header className="header">
        <Link
          className="header__logo logo"
          style={!isMain ? { marginRight: "0", cursor: "pointer" } : {}}
          to={PagePath.MAIN}
        >
          Cinemaddict
        </Link>
        {isMain && !headerText.length && authorizationStatus && user ? (
          <HeaderProfile name={user.name} />
        ) : (
          <h1 className="header__custom-text">{headerText}</h1>
        )}
        {!authorizationStatus && isMain && (
          <div className="header__auth-block">
            <Link className="header__login" to="/login">
              Login
            </Link>
            <Link className="header__login" to="/register">
              Registration
            </Link>
          </div>
        )}
      </header>
    );
  },
);

Header.defaultProps = defaultProps;
