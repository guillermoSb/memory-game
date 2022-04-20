import React from 'react';
import PropTypes from 'prop-types';

function Popup(
  {
    score, onRestart, onExit, displayed,
  },
) {
  return (
    <div className={`popup ${displayed ? '' : 'popup--hiden'}`}>
      <div className="popup__overlay" />
      <div
        className={`popup__content ${displayed ? '' : 'popup__content--hiden'}`}
      >
        <div className="popup__title">
          <h1>¡Has terminado!</h1>
          <p>
            Tu puntaje es
            {score}
          </p>
        </div>
        <div className="popup__options">
          <button type="button" className="main__button" onClick={onRestart}>
            Reiniciar
          </button>
          <button
            className="main__button main__button--black"
            onClick={onExit}
            type="button"
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}

Popup.propTypes = {
  score: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
  onExit: PropTypes.func.isRequired,
  displayed: PropTypes.bool.isRequired,
};

export default Popup;
