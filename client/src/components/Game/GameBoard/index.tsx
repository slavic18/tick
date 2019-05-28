import React from "react";

import "./_styles.css";

const GameBoard: React.FC<{
  board: any;
  onClick: (rowId: number, columnId: number) => void;
}> = ({ board, onClick }) => {
  return (
    <div className="gameboard">
      {board.map((row: any, rowIndex: number) => {
        return (
          <div className="row" key={rowIndex}>
            {row.map((column: any, columnIndex: number) => (
              <div
                className="square"
                key={`${rowIndex}_${columnIndex}`}
                onClick={() => onClick(rowIndex, columnIndex)}
              >
                {column}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
export default GameBoard;
