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

        return shuffle(cardCollection);
    }

    /**
     * Toggle the flip for a card
     * @param {number} index 
     */
    const toggleFlip = (index) => {
        // Do not allow to flip the card back
        if (gameContent[index].isFaceUp || gameContent[index].isMatched) {
            return;
        }
        // Set the game state
        if (currentFaceUpCard === -1) {
            setCurrentFaceUpCard(index);
            console.log('NO CURRENT', currentFaceUpCard)
        } else {
            // Check for a match
            if (gameContent[index].content === gameContent[currentFaceUpCard].content) {

            } else {
                setCurrentFaceUpCard(-1);
            }
        }
        // Set the new game content
        setGameContent(gameContent.map((card, idx) => {
            return {
                ...card,
                isFaceUp: idx === index ? !card.isFaceUp : card.isFaceUp
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