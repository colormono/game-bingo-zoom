import React, { useState, useEffect } from "react";
import { initNumbers, initPlayers, newPlayer, createBoards } from "./utils";
import Player from "./Player";
import "./styles.css";

const config = {
  minPlayers: 2,
  maxPlayers: 8,
  difficulty: 15,
  hints: false
};

export default function App() {
  // this is for fun, you should useReducer instead...
  const [numbers, setNumbers] = useState([]);
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [lastNumber, setLastNumber] = useState(null);
  const [players, setPlayers] = useState(initPlayers(config.minPlayers));
  const [playing, setPlaying] = useState(false);
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    const n = numbers.reduce((accumulator, item) => {
      if (!item.active) accumulator.push(item.number);
      return accumulator;
    }, []);
    setAvailableNumbers(n);

    if (playing && n.length === 0) setWinner(true);
  }, [numbers, playing]);

  const startGame = () => {
    const newNumbers = initNumbers();
    setNumbers(newNumbers);

    const newPlayers = createBoards(players, newNumbers, config.difficulty);
    setPlayers(newPlayers);

    setWinner(false);
    setPlaying(true);
  };

  const pickNumber = () => {
    const rand = Math.floor(Math.random() * availableNumbers.length);

    const pickedNumber = availableNumbers[rand];
    setLastNumber(pickedNumber);

    const newList = numbers;
    newList[pickedNumber].active = true;
    setNumbers([...newList]);
  };

  return (
    <div className="App">
      <h1>BINGO RIVARELA</h1>

      {!playing ? (
        <div className="block">
          <h3>{players.length} Jugadores</h3>

          <button
            type="button"
            onClick={() =>
              setPlayers(prevState =>
                prevState.length < config.maxPlayers
                  ? [...prevState, newPlayer]
                  : prevState
              )
            }
          >
            Agregar un jugador
          </button>

          <button
            type="button"
            onClick={() =>
              setPlayers(prevState =>
                prevState.length > config.minPlayers
                  ? prevState.slice(0, prevState.length - 1)
                  : prevState
              )
            }
          >
            Eliminar un jugador
          </button>

          <br />
          <button type="button" onClick={startGame}>
            Comenzar
          </button>
        </div>
      ) : null}

      {playing ? (
        <div className="block">
          <h3>{lastNumber || "-"}</h3>
          {!winner ? (
            <button type="button" onClick={pickNumber}>
              Sacar bolilla
            </button>
          ) : (
            <button type="button" onClick={() => setPlaying(false)}>
              Nueva partida
            </button>
          )}
          <br />
          {numbers.map(item => {
            return (
              <span
                key={item.number}
                className={`number ${
                  item.active ? "number--active" : "number--regular"
                }`}
              >
                {item.number}
              </span>
            );
          })}

          <hr />

          {players.map(player => (
            <Player
              key={player.id}
              numbers={player.boardNumbers}
              showHints={config.hints}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
