import React, { memo } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Movie } from "../../../../../types";
import { getSlicedDescription } from "../../../../../utils/common";

dayjs.extend(duration);

interface Props {
  movie: Movie;
  isAuth: boolean;
}

export const FilmCardInfo: React.FC<Props> = memo(({ movie, isAuth }) => {
  const slicedDescription = getSlicedDescription(movie.description, 140);
  return (
    <>
      <h3 className="film-card__title">{movie.title}</h3>
      <p className="film-card__rating">{movie.rating}</p>
      <p className="film-card__info">
        <span className="film-card__year">
          {dayjs(movie.releaseDate).format(`DD MMMM YYYY`)}
        </span>
        <span className="film-card__duration">
          {dayjs.duration(movie.runtime, `minutes`).format(`H[h] mm[m]`)}
        </span>
        <span className="film-card__genre">{movie.genres.join(`, `)}</span>
      </p>
      <img
        src={`./${movie.poster}`}
        alt=""
        className={isAuth ? "film-card__poster" : "film-card__poster--no-hover"}
      />
      <p className="film-card__description">{slicedDescription}</p>
    </>
  );
});
