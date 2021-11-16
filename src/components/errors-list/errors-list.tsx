import React from "react";

interface Props {
  errorMessages: string[];
}

export const ErrorsList: React.FC<Props> = ({ errorMessages }) => {
  return (
    <ul className="error-message-list">
      {errorMessages.map((errorMessage) => (
        <li key={errorMessage}>{errorMessage}</li>
      ))}
    </ul>
  );
};
