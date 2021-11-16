import React from "react";
import dayjs from "dayjs";
import history from "../../../history";
import { Movie } from "../../../types";
import { PagePath } from "../../../const";
import { useKeypress } from "../../../hooks/useKeypress";
import { useResetCurrentMovie } from "../../../store/movie/hooks/useResetCurrentMovie";

interface Props {
  movie: Movie;
}

export const FilmDetailsInfo: React.FC<Props> = ({ movie }): JSX.Element => {
  const resetCurrentMovie = useResetCurrentMovie();
  const goToMainPageHandler = () => {
    resetCurrentMovie();
    history.push(PagePath.MAIN);
  };
  useKeypress("Escape", goToMainPageHandler);
  return (
    <>
      <div className="film-details__close">
        <button
          className="film-details__close-btn"
          type="button"
          onClick={goToMainPageHandler}
        >
          close
        </button>
      </div>
      <div className="film-details__info-wrap">
        <div className="film-details__poster">
          <img
            className="film-details__poster-img"
            src={`/${movie.poster}`}
            alt=""
          />

          <p className="film-details__age">{movie.ageRating}+</p>
        </div>

        <div className="film-details__info">
          <div className="film-details__info-head">
            <div className="film-details__title-wrap">
              <h3 className="film-details__title">{movie.title}</h3>
              <p className="film-details__title-original">
                {movie.alternateTitle}
              </p>
            </div>

            <div className="film-details__rating">
              <p className="film-details__total-rating">{movie.rating}</p>
            </div>
          </div>

          <table className="film-details__table">
            <tbody>
              <tr className="film-details__row">
                <td className="film-details__term">Director</td>
                <td className="film-details__cell">{movie.director}</td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">
                  {movie.writers.length > 1 ? `Writers` : `Writer`}
                </td>
                <td className="film-details__cell">
                  {movie.writers.join(`, `)}
                </td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">Actors</td>
                <td className="film-details__cell">
                  {movie.actors.join(`, `)}
                </td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">Release Date</td>
                <td className="film-details__cell">
                  {dayjs(movie.releaseDate).format(`DD MMMM YYYY`)}
                </td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">Runtime</td>
                <td className="film-details__cell">
                  {dayjs
                    .duration(movie.runtime, `minutes`)
                    .format(`H[h] mm[m]`)}
                </td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">
                  {movie.countries.length > 1 ? "Countries" : "Country"}
                </td>
                <td className="film-details__cell">
                  {movie.countries.join(`, `)}
                </td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">
                  {movie.genres.length > 1 ? `Genres` : `Genre`}
                </td>
                <td className="film-details__cell">
                  {movie.genres.map((item) => (
                    <span key={item} className="film-details__genre">
                      {item}
                    </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>

          <p className="film-details__film-description">{movie.description}</p>
        </div>
      </div>
    </>
  );
};
