import React, { useState } from "react";
import { Movie, UserDetailsToUpdate } from "../../../types";
import { Key } from "../../../const";
import { FilmDetailsCheckbox } from "./film-details-checkbox";
import { MoviesService } from "../../../services/movies-service/movies-service";

interface Props {
  movie: Movie;
}

export const FilmDetailsControls: React.FC<Props> = ({
  movie,
}): JSX.Element => {
  const [state, setState] = useState(movie.userDetails);
  const onUserDetailsItemClickHandler =
    (variable: keyof UserDetailsToUpdate) => async () => {
      const newState = {
        ...state,
        [variable]: !state[variable],
      };
      setState(newState);
      await MoviesService.updateUserDetails(movie.id, newState);
    };
  return (
    <section className="film-details__controls">
      <FilmDetailsCheckbox
        name="watchlist"
        checked={state.isInWatchlist}
        text="Add to watchlist"
        handler={onUserDetailsItemClickHandler(Key.WATCHLIST)}
      />
      <FilmDetailsCheckbox
        name="watched"
        checked={state.isWatched}
        text="Already watched"
        handler={onUserDetailsItemClickHandler(Key.HISTORY)}
      />
      <FilmDetailsCheckbox
        name="favorite"
        checked={state.isFavorite}
        text="Add to favorites"
        handler={onUserDetailsItemClickHandler(Key.FAVORITE)}
      />
    </section>
  );
};
