export const FilterType = {
  ALL: `All`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

export const emojis = [`smile`, `sleeping`, `puke`, `angry`];

export const PagePath = {
  MAIN: `/`,
  MOVIE: (id: number | string = `:id`): string => `/movies/${id}`,
  LOGIN: `/login`,
  REGISTRATION: `/register`,
};

export const Key = {
  WATCHLIST: `isInWatchlist`,
  HISTORY: `isWatched`,
  FAVORITE: `isFavorite`,
} as const;

export const defaultUserDetails = {
  isInWatchlist: false,
  isFavorite: false,
  isWatched: false,
  watchingDate: null,
};

export const UserRank = {
  NOVICE: {
    rank: `Novice`,
    minMovies: 1,
  },
  FUN: {
    rank: `Fan`,
    minMovies: 6,
  },
  MOVIE_BUFF: {
    rank: `Movie Buff`,
    minMovies: 18,
  },
};
