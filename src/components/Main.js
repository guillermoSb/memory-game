import React, { useState } from "react";

import { theme } from "../utils/cardLibrary";
import Card from "./Card";

import { useNavigate } from "react-router-dom";

function Main() {
  const [card, setCard] = useState({
    isFaceUp: false,
    content: "😄",
    isMatched: false,
  });

  const navigate = useNavigate();

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

  const startGame = () => {
    return navigate("/game");
  };

  return (
    <div className="main">
      <div className="main__description">
        <h1>Juego Memoria</h1>
        <h2>Por: Guillermo Santos</h2>
        <p>
          Este es un juego de memoria. Tienes que encontrar todos los pares de
          emojis para ganar. ¡Intenta superar tu mejor puntaje!
          <br></br>
          <strong> MEJOR PUNTAJE: {(localStorage.getItem('record') ?? 0) === 0 ? '-' : localStorage.getItem('record')}</strong>
        </p>
        <div className="main__action">
          <button className="main__button" onClick={startGame}>
            ¡Empezar!
          </button>
          <a
            className="main__action-github"
            href="https://github.com/guillermoSb/web-lab08"
            target={"_blank"}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="Github Icon"
            />
          </a>
        </div>
      </div>
      <div className="main__card">
        <Card card={card} onClick={flipCard}></Card>
        <p>Puedes voltear las tarjetas dándoles <strong>CLICK</strong></p>
      </div>
    </div>
  );
}

export default Main;
