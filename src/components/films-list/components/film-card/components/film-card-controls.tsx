import React from "react";
import { FilmCardButton } from "./film-card-button";
import { Key } from "../../../../../const";
import { Movie } from "../../../../../types";
import { useUpdateUserDetailsHandler } from "../../../../../hooks/useUpdateDetails";

interface Props {
  movie: Movie;
}

export const FilmCardControls: React.FC<Props> = ({ movie }) => {
  const onClickHandler = useUpdateUserDetailsHandler(movie);
  const watchlist = movie.userDetails?.isInWatchlist
    ? `film-card__controls-item--active`
    : ``;
  const history = movie.userDetails?.isWatched
    ? `film-card__controls-item--active`
    : ``;
  const favorites = movie.userDetails?.isFavorite
    ? `film-card__controls-item--active`
    : ``;
  return (
    <form className="film-card__controls">
      <FilmCardButton
        type="watchlist"
        activeClass={watchlist}
        text="Add to watchlist"
        handler={onClickHandler(Key.WATCHLIST)}
      />
      <FilmCardButton
        type="history"
        activeClass={history}
        text="Mark as watched"
        handler={onClickHandler(Key.HISTORY)}
      />
      <FilmCardButton
        type="favorite"
        activeClass={favorites}
        text="Mark as favorite"
        handler={onClickHandler(Key.FAVORITE)}
      />
    </form>
  );
};
