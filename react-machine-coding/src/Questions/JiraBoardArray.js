import React, { useRef } from "react";

const JiraBoardArray = ({ data, setBoardData }) => {
  const movingCardId = useRef(null);

  const moveCard = (childId, parentId) => {
    let draggedChild = null;

    const newData = data.map((board) => {
      const filteredChildren = board.children.filter((child) => {
        if (child.id === childId) {
          draggedChild = child;
          return false;
        }
        return true;
      });

      return { ...board, children: filteredChildren };
    });

    const finalData = newData.map((board) => {
      if (board.id === parentId && draggedChild) {
        return {
          ...board,
          children: [...board.children, draggedChild],
        };
      }
      return board;
    });

    setBoardData(finalData);
  };

  const handleOnDragStart = (e) => {
    movingCardId.current = e.currentTarget.dataset.id;
  };

  const handleOnDrop = (e) => {
    e.preventDefault();
    const dropBoardId = e.currentTarget.dataset.id;
    moveCard(movingCardId.current, dropBoardId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="board-container" style={{ display: "flex", gap: "16px" }}>
      {data.map((board) => (
        <div
          key={board.id}
          className="column"
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            width: "200px",
            borderRadius: "8px",
          }}
        >
          <h3>{board.title}</h3>
          <div
            className="cards"
            data-id={board.id}
            onDrop={handleOnDrop}
            onDragOver={handleDragOver}
            style={{
              minHeight: "100px",
              padding: "8px",
              background: "#f5f5f5",
            }}
          >
            {board.children.map((child) => (
              <div
                key={child.id}
                className="card"
                draggable
                data-id={child.id}
                onDragStart={handleOnDragStart}
                style={{
                  margin: "6px 0",
                  padding: "8px",
                  background: "#fff",
                  border: "1px solid #aaa",
                  borderRadius: "4px",
                  cursor: "move",
                }}
              >
                {child.label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JiraBoardArray;
