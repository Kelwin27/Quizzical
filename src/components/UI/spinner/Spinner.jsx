import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

function Spinner({ message }) {
  return (
    <div className="loader-img">
      <PacmanLoader
        color="#36d64f"
        size = "50"
      />

      <p className="loader-msg">{message}</p>
    </div>
  );
}

export default Spinner;