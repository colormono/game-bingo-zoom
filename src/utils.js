import config from "./config";
import { v4 } from "uuid";

export function initNumbers() {
  const b = [];
  for (let n = 0; n < 100; n++) {
    b.push({
      id: n,
      active: false,
      // soon
      type: "image",
      image: "Cow.jpg",
      relation: "C"
    });
  }
  return b;
}

export function initPlayers() {
  const b = [];
  for (let n = 0; n < config.minPlayers; n++) {
    b.push(newPlayer());
  }
  return b;
}

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

export function createBoards(boards, numbers) {
  const gameBoards = [];

  boards.map((board, index) => {
    const randomNumbers = shuffle([...numbers]);
    const boardNumbers = randomNumbers.slice(0, config.difficulty);
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
