import React from "react";

interface Props {
  placeholder: string;
  name: string;
  required: boolean;
  type?: string;
}

const defaultProps = {
  type: "text",
};

export const InputField = React.forwardRef<HTMLInputElement, Props>(
  (props, ref): JSX.Element => {
    return (
      <div className="sign-in__field">
        <input
          className="sign-in__input"
          placeholder={props.placeholder}
          name={props.name}
          id={props.name}
          ref={ref}
          required={props.required}
          type={props.type}
        />
        <label className="sign-in__label visually-hidden" htmlFor={props.name}>
          {props.placeholder}
        </label>
      </div>
    );
  },
);

InputField.defaultProps = defaultProps;
