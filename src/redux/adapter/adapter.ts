import { CommentBackend, Movie, MovieBackend } from "../../types";

export const movieAdapter = (data: MovieBackend): Movie => {
  const info = data.film_info;
  const userDetails = data.user_details;
  return {
    id: Number(data.id),
    commentsIds: data.comments.map((id) => Number(id)),
    filmInfo: {
      actors: info.actors,
      ageRating: info.age_rating,
      alternateTitle: info.alternative_title,
      description: info.description,
      director: info.director,
      genre: info.genre,
      poster: info.poster,
      releaseDate: new Date(info.release.date),
      country: info.release.release_country,
      runtime: info.runtime,
      title: info.title,
      rating: info.total_rating,
      writers: info.writers,
    },
    userDetails: {
      isInWatched: userDetails.already_watched,
      watchingDate: userDetails.watching_date,
      isInFavorite: userDetails.favorite,
      isInWatchlist: userDetails.watchlist,
    },
  };
};

export const toRawMovie = (data: Movie): MovieBackend => {
  return {
    id: String(data.id),
    comments: data.commentsIds.map((id) => String(id)),
    film_info: {
      title: data.filmInfo.title,
      alternative_title: data.filmInfo.alternateTitle,
      total_rating: data.filmInfo.rating,
      poster: data.filmInfo.poster,
      age_rating: data.filmInfo.ageRating,
      director: data.filmInfo.director,
      writers: data.filmInfo.writers,
      actors: data.filmInfo.actors,
      release: {
        date: data.filmInfo.releaseDate.toJSON(),
        release_country: data.filmInfo.country,
      },
      runtime: data.filmInfo.runtime,
      genre: data.filmInfo.genre,
      description: data.filmInfo.description,
    },
    user_details: {
      watchlist: data.userDetails.isInWatchlist,
      already_watched: data.userDetails.isInWatched,
      watching_date: data.userDetails.watchingDate,
      favorite: data.userDetails.isInFavorite,
    },
  };
};

export const commentAdapter = (data: CommentBackend) => {
  return {
    id: Number(data.id),
    author: data.author,
    comment: data.comment,
    date: new Date(data.date),
    emotion: data.emotion,
  };
};
