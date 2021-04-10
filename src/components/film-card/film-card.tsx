import React from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import { Movie } from "../../types";

dayjs.extend(duration);

interface Props {
  movie: Movie;
}

const getSlicedDescription = (description: string, length: number): string => {
  if (description.length > length) {
    return `${description.slice(0, length)}..`;
  }
  return description;
};

const FilmCard: React.FC<Props> = ({ movie }): JSX.Element => {
  const { id, commentsIds, filmInfo, userDetails } = movie;
  const watchlist = userDetails.isInWatchlist
    ? `film-card__controls-item--active`
    : ``;
  const history = userDetails.isInWatched
    ? `film-card__controls-item--active`
    : ``;
  const favorites = userDetails.isInFavorite
    ? `film-card__controls-item--active`
    : ``;
  return (
    <article className="film-card">
      <h3 className="film-card__title">{filmInfo.title}</h3>
      <p className="film-card__rating">{filmInfo.rating}</p>
      <p className="film-card__info">
        <span className="film-card__year">
          {dayjs(filmInfo.releaseDate).format(`DD MMMM YYYY`)}
        </span>
        <span className="film-card__duration">
          {dayjs.duration(filmInfo.runtime, `minutes`).format(`H[h] mm[m]`)}
        </span>
        <span className="film-card__genre">{filmInfo.genre.join(`, `)}</span>
      </p>
      <img src={`./${filmInfo.poster}`} alt="" className="film-card__poster" />
      <p className="film-card__description">
        {getSlicedDescription(filmInfo.description, 140)}
      </p>
      <div className="film-card__bottom-container">
        <a href={id.toString()} className="film-card__comments">
          {commentsIds.length} comments
        </a>
        <form className="film-card__controls">
          <button
            type="button"
            className={`film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist}`}
          >
            Add to watchlist
          </button>
          <button
            type="button"
            className={`film-card__controls-item button film-card__controls-item--mark-as-watched ${history}`}
          >
            Mark as watched
          </button>
          <button
            type="button"
            className={`film-card__controls-item button film-card__controls-item--favorite ${favorites}`}
          >
            Mark as favorite
          </button>
        </form>
      </div>
    </article>
  );
};

export default FilmCard;
