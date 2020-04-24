import React, { useState, useEffect } from "react";
import { initNumbers, initPlayers, newPlayer, createBoards } from "./utils";
import config from "./config";
import { Logo, Button, Icon, IconButton } from "./Elements";
import Board from "./Board";
import "./styles.css";

export default function App() {
  // this is for fun, you should useReducer instead...
  const [numbers, setNumbers] = useState([]);
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [lastNumber, setLastNumber] = useState(null);
  const [boards, setBoards] = useState(initPlayers());
  const [playing, setPlaying] = useState(false);
  const [winner, setWinner] = useState(false);
  const [hints, setHints] = useState(config.showHints);

  useEffect(() => {
    const n = numbers.reduce((accumulator, item) => {
      if (!item.active) accumulator.push(item.number);
      return accumulator;
    }, []);
    setAvailableNumbers(n);

    if (playing && n.length === 0) setWinner(true);
  }, [numbers, playing]);

  const addBoard = () => {
    setBoards(prevState =>
      prevState.length < config.maxPlayers
        ? [...prevState, newPlayer()]
        : prevState
    );
  };

  const removeBoard = () => {
    setBoards(prevState =>
      prevState.length > config.minPlayers
        ? prevState.slice(0, prevState.length - 1)
        : prevState
    );
  };

  const startGame = () => {
    const newChip = initNumbers();
    setNumbers(newChip);

    const newBoards = createBoards(boards, newChip, config.difficulty);
    setBoards(newBoards);

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

  const toggleHints = () => {
    setHints(prevState => !prevState);
  };

  return (
    <div className="m-8">
      <Logo />

      {!playing ? (
        <div className="block">
          <h3>{boards.length} Jugadores</h3>
          <Button onClick={addBoard}>Agregar un jugador</Button>
          <Button onClick={removeBoard}>Eliminar un jugador</Button>
          <br />
          <Button onClick={startGame}>Comenzar</Button>
          <div>Ayuda: Juega con las anotaciones de ZOOM</div>
        </div>
      ) : null}

      {playing ? (
        <div className="block">
          <h3 className="mb-2 text-center text-4xl text-gray-800">
            {lastNumber || "-"}
          </h3>

          <div className="mb-6 flex items-center justify-center">
            {!winner ? (
              <Button onClick={pickNumber}>Sacar bolilla</Button>
            ) : (
              <Button onClick={() => setPlaying(false)}>Nueva partida</Button>
            )}
            <IconButton onClick={toggleHints}>
              {hints ? <Icon>visibility_off</Icon> : <Icon>visibility</Icon>}
            </IconButton>
          </div>

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

          {boards.map(board => (
            <Board key={board.id} data={board} showHints={hints} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
