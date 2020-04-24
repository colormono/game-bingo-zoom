import { v4 } from "uuid";

export function initNumbers() {
  const b = [];
  for (let n = 0; n < 99; n++) {
    b.push({
      number: n,
      active: false,
      image: "soon",
      name: "soon"
    });
  }
  return b;
}

export function initPlayers(minPlayers) {
  const b = [];
  for (let n = 0; n < minPlayers; n++) {
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

export function createBoards(players, numbers, difficulty) {
  const gamePlayers = [];
  console.log(numbers);

  players.map(player => {
    const randomNumbers = shuffle([...numbers]);
    const boardNumbers = randomNumbers.slice(0, difficulty);
    const sortedNumbers = boardNumbers.sort(
      (a, b) => parseFloat(a.number) - parseFloat(b.number)
    );

    player.boardNumbers = sortedNumbers;
    return gamePlayers.push(player);
  });

  return gamePlayers;
}
