import React, { memo } from "react";

interface Props {
  onShowMoreButtonClick: () => void;
}

export const ShowMoreButton: React.FC<Props> = memo(
  ({ onShowMoreButtonClick }): JSX.Element => {
    return (
      <button
        type="button"
        className="films-list__show-more"
        onClick={onShowMoreButtonClick}
      >
        Show more
      </button>
    );
  },
);
