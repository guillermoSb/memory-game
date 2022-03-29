import React, { useEffect, useState } from 'react'
import { theme } from '../utils/cardLibrary';
import { shuffle } from '../utils/shuffle';
import Card from './Card'
import Popup from './Popup';
import { useNavigate } from "react-router-dom";

function Game() {

    const [gameContent, setGameContent] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [currentFaceUpCard, setCurrentFaceUpCard] = useState(-1);
    const [score, setScore] = useState(0);  // Game score
    const [displayPopup, setDisplayPopup] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!gameStarted) {
            restartGame();
        }
        if (gameContent.filter(card => !card.isMatched).length === 0 && gameStarted) {
            const prevRecord = Number(localStorage.getItem('record'));  // Get the previous record
            if (score < prevRecord || prevRecord === 0) {
                localStorage.setItem('record', JSON.stringify(score));
            }
            setDisplayPopup(true);

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
                isMatched: false,
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
        // Do not allow to flip the card back
        if (gameContent[index].isFaceUp || gameContent[index].isMatched ||
            gameContent.filter((card) => card.isFaceUp && !card.isMatched).length >= 2) {
            return;
        }
        setScore(score + 1);
        flipCard(index);
        // Check if there is already a card face up
        if (currentFaceUpCard === -1) {
            setCurrentFaceUpCard(index);
            return;
        } else {
            // Check if there is a match
            if (gameContent[currentFaceUpCard].content === gameContent[index].content) {
                // Mark cards as matched
                markMatchedCards(index);
            } else {
                // Flip back the cards
                flipBackCards(index);
            }
        }

        // Check if match or mismatch 

        setCurrentFaceUpCard(-1);
    };

    /**
     * Flips a card at a given index
     * @param {number} index 
     */
    const flipCard = (index) => {
        setGameContent(gameContent.map((card, idx) => {
            return {
                ...card,
                isFaceUp: idx === index ? !card.isFaceUp : card.isFaceUp
            }
        }))
    }

    /**
     * Marks a matched card
     * @param {number} index 
     */
    const markMatchedCards = (index) => {
        const wait = async () => {
            const promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true);
                }, 400);
            });
            await promise;
            setGameContent(gameContent.map((card, idx) => {
                return {
                    ...card,
                    isFaceUp: idx === index || idx === currentFaceUpCard ? true : card.isMatched,
                    isMatched: idx === index || idx === currentFaceUpCard ? true : card.isMatched
                }
            }));
        }
        wait();

    }

    /**
     * Flips back the current face up cards
     * @param {number} index 
     */
    const flipBackCards = (index) => {
        const wait = async () => {
            const promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true);
                }, 600);
            });
            await promise;
            setGameContent(gameContent.map((card, idx) => {
                return {
                    ...card,
                    isFaceUp: idx === index || idx === currentFaceUpCard ? false : card.isFaceUp,
                }
            }));
        }
        wait();

    }

    /**
     * Handles the restart of the game
     */
    const onGameRestart = () => {
        setDisplayPopup(false);
        restartGame();
    }

    /**
     * Handles the exit of the game
     */
    const onExitGame = () => {
        setDisplayPopup(false);
        navigate("/");
    }

    /**
     * Restarts the game
     */
    const restartGame = () => {
        const cardPairs = createPairs();  // Create card pairs
        setGameContent(cardPairs);  // Set the initial content
        setGameStarted(true);   // Set an indicator that the game has started to avoid infinite loops
        setScore(0);
    }

    return (
        <>
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
            <Popup displayed={displayPopup} score={score} onRestart={onGameRestart} onExit={onExitGame}></Popup>
        </>
    );
}

export default Game