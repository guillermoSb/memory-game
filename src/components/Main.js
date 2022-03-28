import React, { useState } from "react";
import { theme } from "../utils/cardLibrary";
import Card from "./Card";

function Main() {
  const [card, setCard] = useState({
    isFaceUp: false,
    content: "😄",
    isMatched: false,
  });

  const flipCard = () => {
    // Pick random card
    let newContent = "";
    // Only change if the card is flipped down
    if (!card.isFaceUp) {
      do {
        newContent = theme[Math.floor(Math.random() * (theme.length - 1))];
      } while (newContent == card.content);
    }
    setCard({
      ...card,
      content: newContent,
      isFaceUp: !card.isFaceUp,
    });
  };

  const startGame = () => {};

  return (
    <div className="main">
      <div className="main__description">
        <h1>Juego Memoria</h1>
        <h2>Por: Guillermo Santos</h2>
        <p>
          Este es un juego de memoria. Tienes que encontrar todos los pares de
          emojis para ganar. ¡Intenta superar tu record!
        </p>
        <button className="main__button" onClick={startGame}>
          ¡Empezar!
        </button>
      </div>
      <div className="main__card">
        <Card card={card} onClick={flipCard}></Card>
        <p>Puedes voltear las tarjetas dándoles click</p>
      </div>
    </div>
  );
}

export default Main;
