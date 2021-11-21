import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const style = {
    minHeight: "inherit",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
  } as CSSProperties;

  return (
    <div style={style}>
      <div>
        <h1>Page Not Found!</h1>
        <Link to="/">Go to Main Page</Link>
      </div>
    </div>
  );
};

export default NotFound;
