import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Card({ card, onClick, index }) {
  const [prevFaceUp, setPrevFaceUp] = useState(false);

  useEffect(() => {
    if (prevFaceUp !== card.isFaceUp) {
      setPrevFaceUp(card.isFaceUp);
    }
  });

  return (
    <div className="scene">
      <button
        type="button"
        className={`card ${card.isFaceUp ? 'card--flip' : ''} ${
          card.isMatched ? 'card--matched' : ''
        }`}
        onClick={() => onClick(index)}
      >
        <div className="card__face card__face--front">
          <p>{card.content}</p>
        </div>
        <div className="card__face card__face--back" />
      </button>
    </div>
  );
}

Card.propTypes = {
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  card: PropTypes.shape({
    content: PropTypes.string,
    isMatched: PropTypes.bool,
    isFaceUp: PropTypes.bool,
  }).isRequired,
};

export default Card;
