import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const style = {
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  minHeight: `100vh`,
};

export const LoadingSpinner: React.FC = (): JSX.Element => {
  return (
    <div className="page-content" style={style}>
      <Loader type="Watch" color="#AF904C" height={100} width={100} />
    </div>
  );
};
