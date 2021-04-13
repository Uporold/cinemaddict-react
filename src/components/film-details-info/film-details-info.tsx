import React from "react";
import dayjs from "dayjs";
import history from "../../history";
import { Movie } from "../../types";

interface Props {
  movie: Movie;
}

const FilmDetailsInfo: React.FC<Props> = ({ movie }): JSX.Element => {
  return (
    <>
      <div className="film-details__close">
        <button
          className="film-details__close-btn"
          type="button"
          onClick={history.goBack}
        >
          close
        </button>
      </div>
      <div className="film-details__info-wrap">
        <div className="film-details__poster">
          <img
            className="film-details__poster-img"
            src={`/${movie.filmInfo.poster}`}
            alt=""
          />

          <p className="film-details__age">{movie.filmInfo.ageRating}+</p>
        </div>

        <div className="film-details__info">
          <div className="film-details__info-head">
            <div className="film-details__title-wrap">
              <h3 className="film-details__title">{movie.filmInfo.title}</h3>
              <p className="film-details__title-original">
                {movie.filmInfo.alternateTitle}
              </p>
            </div>

            <div className="film-details__rating">
              <p className="film-details__total-rating">
                {movie.filmInfo.rating}
              </p>
            </div>
          </div>

          <table className="film-details__table">
            <tbody>
              <tr className="film-details__row">
                <td className="film-details__term">Director</td>
                <td className="film-details__cell">
                  {movie.filmInfo.director}
                </td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">
                  {movie.filmInfo.writers.length > 1 ? `Writers` : `Writer`}
                </td>
                <td className="film-details__cell">
                  {movie.filmInfo.writers.join(`, `)}
                </td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">Actors</td>
                <td className="film-details__cell">
                  {movie.filmInfo.actors.join(`, `)}
                </td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">Release Date</td>
                <td className="film-details__cell">
                  {dayjs(movie.filmInfo.releaseDate).format(`DD MMMM YYYY`)}
                </td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">Runtime</td>
                <td className="film-details__cell">
                  {dayjs
                    .duration(movie.filmInfo.runtime, `minutes`)
                    .format(`H[h] mm[m]`)}
                </td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">Country</td>
                <td className="film-details__cell">{movie.filmInfo.country}</td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">
                  {movie.filmInfo.genre.length > 1 ? `Genres` : `Genre`}
                </td>
                <td className="film-details__cell">
                  {movie.filmInfo.genre.map((item) => (
                    <span className="film-details__genre">{item}</span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>

          <p className="film-details__film-description">
            {movie.filmInfo.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default FilmDetailsInfo;
