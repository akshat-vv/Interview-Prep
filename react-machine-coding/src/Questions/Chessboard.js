import React from "react";

const ChessBoard = () => {
  const board = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const isWhite = (row + col) % 2 === 0;
      board.push(
        <div
          key={`${row}-${col}`}
          className={`square ${isWhite ? "white" : "black"}`}
        />
      );
    }
  }

  console.log(board);

  return <div className="chessboard">{board}</div>;
};

export default ChessBoard;
