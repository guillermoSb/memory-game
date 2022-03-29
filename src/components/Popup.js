import React from "react";

function Popup({ score, onRestart, onExit, displayed }) {
  return (
    <div className={`popup ${displayed ? "" : "popup--hiden"}`}>
      <div className="popup__overlay"></div>
      <div
        className={`popup__content ${displayed ? "" : "popup__content--hiden"}`}
      >
        <div className="popup__title">
          <h1>¡Has terminado!</h1>
          <p>Tu puntaje es {score}</p>
        </div>
        <div className="popup__options">
          <button className="main__button" onClick={onRestart}>
            Reiniciar
          </button>
          <button className="main__button main__button--black" onClick={onExit}>
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
