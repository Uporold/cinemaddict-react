import React from "react";

interface Props {
  name: string;
  checked: boolean;
  text: string;
  handler: () => void;
}

export const FilmDetailsCheckbox: React.FC<Props> = ({
  name,
  checked,
  text,
  handler,
}) => {
  return (
    <>
      <input
        type="checkbox"
        className="film-details__control-input visually-hidden"
        name={name}
        checked={checked}
        readOnly
      />
      <label
        htmlFor={name}
        className={`film-details__control-label film-details__control-label--${name}`}
        onClick={handler}
      >
        {text}
      </label>
    </>
  );
};
