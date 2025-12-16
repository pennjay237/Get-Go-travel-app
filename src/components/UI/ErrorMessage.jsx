import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-100 text-red-700 p-4 rounded shadow text-center">
      {message || "Something went wrong!"}
    </div>
  );
};

export default ErrorMessage;
