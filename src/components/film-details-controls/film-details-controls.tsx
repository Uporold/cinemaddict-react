import React from "react";
import { UserDetails, UserDetailsToUpdate } from "../../types";

interface Props {
  userDetails: UserDetails;
  updateUserDetailsHandler: (target: keyof UserDetailsToUpdate) => () => void;
}

const FilmDetailsControls: React.FC<Props> = ({
  userDetails,
  updateUserDetailsHandler,
}): JSX.Element => {
  return (
    <section className="film-details__controls">
      <input
        type="checkbox"
        className="film-details__control-input visually-hidden"
        name="watchlist"
        checked={userDetails.isInWatchlist}
      />
      <label
        htmlFor="watchlist"
        className="film-details__control-label film-details__control-label--watchlist"
        onClick={updateUserDetailsHandler(`isInWatchlist`)}
      >
        Add to watchlist
      </label>
      <input
        type="checkbox"
        className="film-details__control-input visually-hidden"
        name="watched"
        checked={userDetails.isInWatched}
      />
      <label
        htmlFor="watched"
        className="film-details__control-label film-details__control-label--watched"
        onClick={updateUserDetailsHandler(`isInWatched`)}
      >
        Already watched
      </label>
      <input
        type="checkbox"
        className="film-details__control-input visually-hidden"
        name="favorite"
        checked={userDetails.isInFavorite}
      />
      <label
        htmlFor="favorite"
        className="film-details__control-label film-details__control-label--favorite"
        onClick={updateUserDetailsHandler(`isInFavorite`)}
      >
        Add to favorites
      </label>
    </section>
  );
};

export default FilmDetailsControls;
