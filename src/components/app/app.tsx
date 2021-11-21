import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Main } from "../../pages/main/main";
import history from "../../history";
import { FilmDetails } from "../../pages/film-details/film-details";
import { PagePath } from "../../const";
import { Login } from "../../pages/login/login";
import AuthVerify from "../../utils/auth-verify";
import { useLogout } from "../../store/auth/hooks/useLogout";
import { useAuthorizationStatus } from "../../store/auth/hooks/selectors";
import { Registration } from "../../pages/registration/registration";
import NotFound from "../not-found/not-found";

export const App: React.FC = (): JSX.Element => {
  const logout = useLogout();
  const authorizationStatus = useAuthorizationStatus();
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route exact path={PagePath.MAIN} component={Main} />
          <Route exact path={PagePath.MOVIE()} component={FilmDetails} />
          <Route
            exact
            path={PagePath.LOGIN}
            render={() => {
              return !authorizationStatus ? <Login /> : <Redirect to="/" />;
            }}
          />
          <Route
            exact
            path={PagePath.REGISTRATION}
            render={() => {
              return !authorizationStatus ? (
                <Registration />
              ) : (
                <Redirect to="/" />
              );
            }}
          />
          <Route component={NotFound} />
        </Switch>
        <AuthVerify logout={logout} />
      </Router>
    </>
  );
};
