import React, { useEffect, useState } from 'react'
import { shuffle } from '../utils/shuffle';
import Card from './Card'

function Game() {
    const theme = ["😄", "😈", "😜", "🤨", "😖", "😎", "🥸"];
    const [gameContent, setGameContent] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [currentFaceUpCard, setCurrentFaceUpCard] = useState(-1);

    useEffect(() => {
        if (!gameStarted) {
            const cardPairs = createPairs();  // Create card pairs
            setGameContent(cardPairs);  // Set the initial content
            setGameStarted(true);   // Set an indicator that the game has started to avoid infinite loops
        }
    }, [gameContent])



    /**
     * Creates an array with the cards to be played
     * @returns {string[]}
     */
    const createPairs = () => {
        const cardCollection = [];
        for (const item of theme) {
            const card = {
                content: item,
                isFaceUp: false,
                isMatched: false
            }
            cardCollection.push(card);
            cardCollection.push(card);
        }

        return cardCollection;
    }

    /**
     * Toggle the flip for a card
     * @param {number} index 
     */
    const toggleFlip = (index) => {
        let cardMatched = false;
        // Do not allow to flip the card back
        if (gameContent[index].isFaceUp || gameContent[index].isMatched) {
            return;
        }
        if (currentFaceUpCard === -1) {
            setCurrentFaceUpCard(index);    // Set the new current face up card   
        } else {
            // Check for a match
            cardMatched = gameContent[index].content === gameContent[currentFaceUpCard].content
            setCurrentFaceUpCard(-1);
        }
        // Set the new game content
        setGameContent(gameContent.map((card, idx) => {
            return {
                ...card,
                isFaceUp: idx === index ? !card.isFaceUp : card.isFaceUp,
                isMatched: (cardMatched && (idx === index || idx === currentFaceUpCard)) || card.isMatched
            }
        }))

    };

    return (
        <div className="card-container">
            {gameContent.map((card, index) => {
                return (
                    <Card key={index} card={card} index={index} onClick={toggleFlip} />
                );
            })}
        </div>
    );
}

export default Game