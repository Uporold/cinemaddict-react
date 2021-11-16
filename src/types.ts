export interface Movie {
  id: number;
  commentsCount: number;
  actors: string[];
  ageRating: number;
  alternateTitle: string;
  description: string;
  director: string;
  genres: string[];
  poster: string;
  releaseDate: Date;
  countries: string[];
  runtime: number;
  title: string;
  rating: number;
  writers: string[];
  userDetails: UserDetails;
}

export interface UserDetails {
  isWatched: boolean;
  watchingDate: Date | null;
  isFavorite: boolean;
  isInWatchlist: boolean;
}

export interface UserDetailsToUpdate {
  isWatched: boolean;
  isFavorite: boolean;
  isInWatchlist: boolean;
}

export interface Comment {
  id: number;
  user: User;
  message: string;
  creationDate: Date;
  emotion: string;
}

export interface CommentPure {
  message: string;
  emotion: string;
}

export interface User {
  id: number;
  name: string;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface RegistrationData extends AuthData {
  name: string;
  email: string;
}

export type ValueOf<T> = T[keyof T];
