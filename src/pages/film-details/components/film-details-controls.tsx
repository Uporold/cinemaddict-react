import React, { memo } from "react";
import { Movie } from "../../../types";
import { Key } from "../../../const";
import { useUpdateUserDetailsHandler } from "../../../hooks/useUpdateDetails";
import { FilmDetailsCheckbox } from "./film-details-checkbox";

interface Props {
  movie: Movie;
}

export const FilmDetailsControls: React.FC<Props> = memo(
  ({ movie }): JSX.Element => {
    const onClickHandler = useUpdateUserDetailsHandler(movie);
    return (
      <section className="film-details__controls">
        <FilmDetailsCheckbox
          name="watchlist"
          checked={movie.userDetails.isInWatchlist}
          text="Add to watchlist"
          handler={onClickHandler(Key.WATCHLIST)}
        />
        <FilmDetailsCheckbox
          name="watched"
          checked={movie.userDetails.isWatched}
          text="Already watched"
          handler={onClickHandler(Key.HISTORY)}
        />
        <FilmDetailsCheckbox
          name="favorite"
          checked={movie.userDetails.isFavorite}
          text="Add to favorites"
          handler={onClickHandler(Key.FAVORITE)}
        />
      </section>
    );
  },
);
