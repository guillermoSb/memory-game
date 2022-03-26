import React, { useState } from "react";

function Card({ card, onClick, index }) {
  return (
    <div className="scene">
      <div
        className={`card ${card.isFaceUp ? "card--flip" : ""} ${card.isMatched ? "card--matched" : ""}`}
        onClick={() => onClick(index)}
      >
        <div className="card__face card__face--front">{card.content}</div>
        <div className="card__face card__face--back"></div>
      </div>
    </div>
  );
}

export default Card;
