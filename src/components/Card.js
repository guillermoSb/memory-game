import React, { useState } from "react";

function Card({ content }) {
  const [flipCard, setFlipCard] = useState(false);
  const toggleFlip = (e) => {
    setFlipCard(!flipCard);
  };
  return (
    <div className="scene">
      <div
        className={`card ${flipCard ? "card--flip" : ""}`}
        onClick={toggleFlip}
      >
        <div className="card__face card__face--front">{content}</div>
        <div className="card__face card__face--back"></div>
      </div>
    </div>
  );
}

export default Card;
