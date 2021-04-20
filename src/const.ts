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
};

export const Key = {
  WATCHLIST: `isInWatchlist`,
  HISTORY: `isInWatched`,
  FAVORITE: `isInFavorite`,
} as const;
