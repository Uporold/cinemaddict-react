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
      alternateTitle: info.alternate_title,
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

export const commentAdapter = (data: CommentBackend) => {
  return {
    id: Number(data.id),
    author: data.author,
    comment: data.comment,
    date: new Date(data.date),
    emotion: data.emotion,
  };
};
