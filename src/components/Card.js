import React, { useEffect, useRef, useState } from "react";

function Card({ card, onClick, index }) {

  const [prevFaceUp, setPrevFaceUp] = useState(false);

  useEffect(() => {

    if (prevFaceUp != card.isFaceUp) {
      console.log(card.isFaceUp, prevFaceUp);
      setPrevFaceUp(card.isFaceUp);
    }
  })

  return (
    <div className="scene">
      <div
        className={`card ${card.isFaceUp ? "card--flip" : ""} ${card.isMatched ? "card--matched" : ""}`}
        onClick={() => onClick(index)}
      >
        <div className="card__face card__face--front">
          <p>{card.content}</p>
        </div>
        <div className="card__face card__face--back"></div>
      </div>
    </div >
  );
}

export default Card;
