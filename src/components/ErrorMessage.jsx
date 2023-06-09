import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div id="error-message">
      <h3>Oops! Something went wrong</h3>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
