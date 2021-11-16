import { Movie } from "../../types";
import { defaultUserDetails } from "../../const";

export const movieAdapter = (data: Movie): Movie => {
  return {
    id: Number(data.id),
    commentsCount: data.commentsCount,
    actors: data.actors,
    ageRating: data.ageRating,
    alternateTitle: data.alternateTitle,
    description: data.description,
    director: data.director,
    genres: data.genres,
    poster: data.poster,
    releaseDate: data.releaseDate,
    countries: data.countries,
    runtime: data.runtime,
    title: data.title,
    rating: data.rating,
    writers: data.writers,
    userDetails:
      data.userDetails === null ? defaultUserDetails : data.userDetails,
  };
};
