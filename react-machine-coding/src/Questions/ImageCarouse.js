import React, { useState } from "react";

const images = [
  "https://picsum.photos/id/1018/600/400",
  "https://picsum.photos/id/1015/600/400",
  "https://picsum.photos/id/1016/600/400",
  "https://picsum.photos/id/1021/600/400",
  "https://picsum.photos/id/1020/600/400"
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div style={{ textAlign: "center", width: "600px", margin: "auto" }}>
      <img
        src={images[index]}
        alt={`Slide ${index}`}
        style={{ width: "100%", height: "400px", objectFit: "cover" }}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePrev}>⟨</button>
        <span style={{ margin: "0 10px" }}>
          {index + 1} / {images.length}
        </span>
        <button onClick={handleNext}>⟩</button>
      </div>
      <div style={{ marginTop: "10px" }}>
        {images.map((_, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: index === i ? "black" : "#ccc",
              margin: "0 4px"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
