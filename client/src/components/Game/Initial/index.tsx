import React from "react";

import "./_styles.css";

const Initial: React.FC<{
  onFirstButtonClick: () => void;
  onSecondButtonClick: () => void;
}> = ({ onFirstButtonClick, onSecondButtonClick }) => {
  return (
    <div className="initialscreen">
      <button
        type="button"
        className="btn btn-primary initialscreen__button"
        onClick={onFirstButtonClick}
      >
        Create a new game
      </button>
      <button
        type="button"
        className="btn btn-primary initialscreen__button"
        onClick={onSecondButtonClick}
      >
        Join existing games
      </button>
    </div>
  );
};
export default Initial;
