import React from "react";
import { Movie } from "../../types";
import { useMovies } from "../../redux/data/hooks/selectors";

const UserRank = {
  NOVICE: {
    rank: `Novice`,
    minMovies: 1,
  },
  FUN: {
    rank: `Fan`,
    minMovies: 11,
  },
  MOVIE_BUFF: {
    rank: `Movie Buff`,
    minMovies: 18,
  },
};

export const getUserRank = (movies: Movie[]): string => {
  const watchedMovies = movies.filter((movie) => movie.userDetails.isInWatched)
    .length;
  switch (true) {
    case watchedMovies >= UserRank.NOVICE.minMovies &&
      watchedMovies < UserRank.FUN.minMovies:
      return UserRank.NOVICE.rank;
    case watchedMovies >= UserRank.FUN.minMovies &&
      watchedMovies < UserRank.MOVIE_BUFF.minMovies:
      return UserRank.FUN.rank;
    case watchedMovies >= UserRank.MOVIE_BUFF.minMovies:
      return UserRank.MOVIE_BUFF.rank;
    default:
      return ``;
  }
};

const Header: React.FC = (): JSX.Element => {
  const movies = useMovies();
  const userRank = getUserRank(movies);
  return (
    <header className="header">
      <h1 className="header__logo logo">Cinemaddict</h1>
      <section className="header__profile profile">
        <p className="profile__rating">{userRank}</p>
        <img
          className="profile__avatar"
          src="images/bitmap@2x.png"
          alt="Avatar"
          width="35"
          height="35"
        />
      </section>
    </header>
  );
};

export default Header;
