import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

interface Props extends RouteComponentProps {
  logout: () => void;
}

const AuthVerify: React.FC<Props> = (props) => {
  const { history } = props;
  history.listen(() => {
    const user = JSON.parse(localStorage.getItem("user") as string);

    if (user) {
      const decodedJwt = parseJwt(user.token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logout();
      }
    }
  });

  return <div />;
};

export default withRouter(AuthVerify);
