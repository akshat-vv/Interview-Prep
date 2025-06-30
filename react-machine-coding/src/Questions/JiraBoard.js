import React from "react";
import { v4 as uuid } from "uuid";

const JiraBoard = () => {
  const data = [
    {
      id: uuid(),
      name: "Good",
      children: [
        { id: uuid(), name: "I was happy" },
        { id: uuid(), name: "I was Sad" },
      ],
    },
    {
      id: uuid(),
      name: "Bad",
      children: [
        { id: uuid(), name: "I was Akshat" },
        { id: uuid(), name: "I was Vijay" },
      ],
    },
    {
      id: uuid(),
      name: "Worst",
      children: [
        { id: uuid(), name: "I was Naman" },
        { id: uuid(), name: "I was Sharma" },
      ],
    },
  ];

  const handleOnDragStart = (e) => {
    e.dataTransfer.setData("cardId", e.target.id);
  };

  const handleDragOver = (e) => {
    if (e.currentTarget.classList.contains("children-zone")) {
      e.preventDefault(); // Needed to allow drop
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    const card = document.getElementById(cardId);

    // Drop only if target is the .children-zone
    if (e.currentTarget.classList.contains("children-zone")) {
      e.currentTarget.appendChild(card);
    }
  };

  const RenderJiraBoard = ({ data }) => {
    return data.map((column) => (
      <div
        key={column.id}
        style={{
          border: "1px solid black",
          width: "33%",
          minHeight: "50vh",
          padding: "10px",
        }}
      >
        <h2>{column.name}</h2>

        <div
          className="children-zone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minHeight: "200px",
            backgroundColor: "#f3f3f3",
            padding: "10px",
          }}
        >
          {column.children.map((card) => (
            <div
              key={card.id}
              id={card.id}
              draggable={true}
              onDragStart={handleOnDragStart}
              style={{
                height: "100px",
                background: "grey",
                color: "white",
                padding: "10px",
                cursor: "move",
              }}
            >
              {card.name}
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "50px",
        width: "90%",
        margin: "auto",
        justifyContent: "space-around",
      }}
    >
      <RenderJiraBoard data={data} />
    </div>
  );
};

export default JiraBoard;
