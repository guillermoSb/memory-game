import React, { useEffect, useState } from 'react'
import { shuffle } from '../utils/shuffle';
import Card from './Card'

function Game() {
    const theme = ["😄", "😈", "😜", "🤨", "😖", "😎", "🥸"];
    const [gameContent, setGameContent] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [currentFaceUpCard, setCurrentFaceUpCard] = useState(-1);
    const [score, setScore] = useState(0);  // Game score

    useEffect(() => {
        if (!gameStarted) {
            const cardPairs = createPairs();  // Create card pairs
            setGameContent(cardPairs);  // Set the initial content
            setGameStarted(true);   // Set an indicator that the game has started to avoid infinite loops
        }
        // Check for cards to flip back
        if (currentFaceUpCard === -1 && gameContent.filter(card => card.isFaceUp && !card.isMatched).length == 2) {
            setGameContent(gameContent.map((card) => {
                return {
                    ...card,
                    isFaceUp: card.isMatched
                }
            }))
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
        setScore(score + 1);    // Increment the score
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
        <div className='game'>
            <h1>Movimientos {score}</h1>
            <div className="card-container">
                {gameContent.map((card, index) => {
                    return (
                        <Card key={index} card={card} index={index} onClick={toggleFlip} />
                    );
                })}
            </div>
        </div>
    );
}

export default Game