
/**
 * Shuffle an array using Fisher-Yates Shuffle.
 * This method was developed following this article: https://bost.ocks.org/mike/shuffle/
 * @param {any[]} array 
 */
export const shuffle = (array) => {
    let shuffledArray = [...array];
    let m = array.length;   // m is the size of the array
    let currentItem, i;    // Variables to store indices
    // While we still have elements to shuffle
    while (m != 0) {
        i = Math.floor(Math.random() * m--);    // Pick a random index and decrease m
        currentItem = shuffledArray[m]; // Get the current item
        shuffledArray[m] = shuffledArray[i];    // Place the random element at the end
        shuffledArray[i] = currentItem; // Place the current item on the random position
    }
    return shuffledArray;
}