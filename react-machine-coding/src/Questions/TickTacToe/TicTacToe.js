import React, { useState } from "react";

const initialBoard = Array(9).fill(null);

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return {
        winner: squares[a],
        winningIndex: [a, b, c],
      };
    }
  }
  return null;
};

const Square = ({ value, onClick, index, winningIndex }) => (
  <button
    onClick={onClick}
    style={{
      background: winningIndex?.includes(index) ? "green" : "",
      width: "60px",
      height: "60px",
      fontSize: "24px",
      fontWeight: "bold",
      margin: "5px",
      cursor: "pointer",
    }}
  >
    {value}
  </button>
);

const TicTacToe = () => {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);

  const winnerObj = calculateWinner(board);
  const isDraw = board.every(Boolean) && !winnerObj?.winner;

  const handleClick = (index) => {
    if (board[index] || winnerObj?.winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";

    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setXIsNext(true);
  };

  const status = winnerObj?.winner
    ? `Winner: ${winnerObj?.winner}`
    : isDraw
    ? "Draw!"
    : `Next Player: ${xIsNext ? "X" : "O"}`;

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Tic Tac Toe</h2>
      <div style={{ marginBottom: "20px" }}>{status}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 70px)",
          justifyContent: "center",
        }}
      >
        {board.map((value, idx) => (
          <Square
            key={idx}
            value={value}
            onClick={() => handleClick(idx)}
            index={idx}
            winningIndex={winnerObj?.winningIndex}
          />
        ))}
      </div>
      <button
        onClick={resetGame}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
      >
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
