import React from "react";
import dayjs from "dayjs";
import history from "../../history";
import { MovieInfo } from "../../types";
import { PagePath } from "../../const";

interface Props {
  filmInfo: MovieInfo;
}

const FilmDetailsInfo: React.FC<Props> = ({ filmInfo }): JSX.Element => {
  return (
    <>
      <div className="film-details__close">
        <button
          className="film-details__close-btn"
          type="button"
          onClick={() => {
            history.push(PagePath.MAIN);
          }}
        >
          close
        </button>
      </div>
      <div className="film-details__info-wrap">
        <div className="film-details__poster">
          <img
            className="film-details__poster-img"
            src={`/${filmInfo.poster}`}
            alt=""
          />

          <p className="film-details__age">{filmInfo.ageRating}+</p>
        </div>

        <div className="film-details__info">
          <div className="film-details__info-head">
            <div className="film-details__title-wrap">
              <h3 className="film-details__title">{filmInfo.title}</h3>
              <p className="film-details__title-original">
                {filmInfo.alternateTitle}
              </p>
            </div>

            <div className="film-details__rating">
              <p className="film-details__total-rating">{filmInfo.rating}</p>
            </div>
          </div>

          <table className="film-details__table">
            <tbody>
              <tr className="film-details__row">
                <td className="film-details__term">Director</td>
                <td className="film-details__cell">{filmInfo.director}</td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">
                  {filmInfo.writers.length > 1 ? `Writers` : `Writer`}
                </td>
                <td className="film-details__cell">
                  {filmInfo.writers.join(`, `)}
                </td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">Actors</td>
                <td className="film-details__cell">
                  {filmInfo.actors.join(`, `)}
                </td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">Release Date</td>
                <td className="film-details__cell">
                  {dayjs(filmInfo.releaseDate).format(`DD MMMM YYYY`)}
                </td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">Runtime</td>
                <td className="film-details__cell">
                  {dayjs
                    .duration(filmInfo.runtime, `minutes`)
                    .format(`H[h] mm[m]`)}
                </td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">Country</td>
                <td className="film-details__cell">{filmInfo.country}</td>
              </tr>
              <tr className="film-details__row">
                <td className="film-details__term">
                  {filmInfo.genre.length > 1 ? `Genres` : `Genre`}
                </td>
                <td className="film-details__cell">
                  {filmInfo.genre.map((item) => (
                    <span key={item} className="film-details__genre">
                      {item}
                    </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>

          <p className="film-details__film-description">
            {filmInfo.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default FilmDetailsInfo;
