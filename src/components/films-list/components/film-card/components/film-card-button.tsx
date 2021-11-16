import React from "react";

interface Props {
  type: string;
  text: string;
  activeClass: string;
  handler: () => void;
}

export const FilmCardButton: React.FC<Props> = ({
  type,
  handler,
  text,
  activeClass,
}) => {
  return (
    <button
      type="button"
      className={`film-card__controls-item button film-card__controls-item--add-to-${type} ${activeClass}`}
      onClick={handler}
    >
      {text}
    </button>
  );
};
