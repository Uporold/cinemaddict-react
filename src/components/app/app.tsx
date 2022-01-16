import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Main } from "../../pages/main/main";
import history from "../../history";
import { FilmDetails } from "../../pages/film-details/film-details";
import { PagePath } from "../../const";
import { Login } from "../../pages/login/login";
import AuthVerify from "../../utils/auth-verify";
import { Registration } from "../../pages/registration/registration";
import { NotFound } from "../not-found/not-found";
import { useStore } from "../../store";

export const App: React.FC = observer((): JSX.Element => {
  const {
    authStore: { authorizationStatus, logout },
  } = useStore();
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
              return !authorizationStatus ? (
                <Login />
              ) : (
                <Redirect to={PagePath.MAIN} />
              );
            }}
          />
          <Route
            exact
            path={PagePath.REGISTRATION}
            render={() => {
              return !authorizationStatus ? (
                <Registration />
              ) : (
                <Redirect to={PagePath.MAIN} />
              );
            }}
          />
          <Route component={NotFound} />
        </Switch>
        <AuthVerify logout={logout} />
      </Router>
    </>
  );
});
