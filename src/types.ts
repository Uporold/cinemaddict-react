export interface Movie {
  id: number;
  commentsIds: number[];
  filmInfo: MovieInfo;
  userDetails: UserDetails;
}

export interface MovieBackend {
  id: string;
  comments: string[];
  film_info: {
    actors: string[];
    age_rating: number;
    alternative_title: string;
    description: string;
    director: string;
    genre: string[];
    poster: string;
    release: {
      date: string;
      release_country: string;
    };
    runtime: number;
    title: string;
    total_rating: number;
    writers: string[];
  };
  user_details: {
    already_watched: boolean;
    watching_date: Date | null;
    favorite: boolean;
    watchlist: boolean;
  };
}

interface MovieInfo {
  actors: string[];
  ageRating: number;
  alternateTitle: string;
  description: string;
  director: string;
  genre: string[];
  poster: string;
  releaseDate: Date;
  country: string;
  runtime: number;
  title: string;
  rating: number;
  writers: string[];
}

export interface UserDetails {
  isInWatched: boolean;
  watchingDate: Date | null;
  isInFavorite: boolean;
  isInWatchlist: boolean;
}

export interface UserDetailsToUpdate {
  isInWatched: boolean;
  isInFavorite: boolean;
  isInWatchlist: boolean;
}

export interface Comment {
  id: number;
  author: string;
  comment: string;
  date: Date;
  emotion: string;
}

export interface CommentPure {
  comment: string;
  date: string;
  emotion: string;
}

export interface CommentBackend {
  id: string;
  author: string;
  comment: string;
  date: string;
  emotion: string;
}
