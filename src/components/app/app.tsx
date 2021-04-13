import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Main from "../../pages/main/main";
import history from "../../history";
import FilmDetails from "../../pages/film-details/film-details";

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/movies/:id" component={FilmDetails} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
