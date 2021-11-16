import React from "react";
import { Link } from "react-router-dom";
import { PagePath } from "../../const";
import {
  useAuthorizationStatus,
  useUser,
} from "../../store/auth/hooks/selectors";
import { HeaderProfile } from "./components/header-profile";

interface Props {
  isMain?: boolean;
  headerText?: string;
}

const defaultProps: Props = {
  isMain: true,
  headerText: "",
};

export const Header: React.FC<Props> = ({
  isMain = true,
  headerText = "",
}): JSX.Element => {
  const authStatus = useAuthorizationStatus();
  const user = useUser();
  return (
    <header className="header">
      <Link
        className="header__logo logo"
        style={!isMain ? { marginRight: "0", cursor: "pointer" } : {}}
        to={PagePath.MAIN}
      >
        Cinemaddict
      </Link>
      {isMain && !headerText.length && authStatus && user ? (
        <HeaderProfile name={user.name} />
      ) : (
        <h1 className="header__custom-text">{headerText}</h1>
      )}
      {!authStatus && isMain && (
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
};

Header.defaultProps = defaultProps;
