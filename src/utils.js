import config from "./config";
import { v4 } from "uuid";

/**
 * Return array of players
 */
export function initPlayers() {
  const b = [];
  for (let n = 0; n < config.minPlayers; n++) {
    b.push(newPlayer());
  }
  return b;
}

/**
 * Return an object with a unique id
 */
export function newPlayer() {
  return { id: v4() };
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createBoards(boards = [], numbers = [], difficulty = 15) {
  const gameBoards = [];

  boards.map((board, index) => {
    const randomNumbers = shuffle([...numbers]);
    const boardNumbers = randomNumbers.slice(0, difficulty);
    const sortedNumbers = boardNumbers.sort(
      (a, b) => parseFloat(a.id) - parseFloat(b.id)
    );

    board.id = v4();
    board.color = config.colors[index];
    board.numbers = sortedNumbers;

    return gameBoards.push(board);
  });

  return gameBoards;
}
