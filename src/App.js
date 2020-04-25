import React, { useState, useEffect, useCallback } from "react";
import config from "./config";
import { initNumbers, initPlayers, newPlayer, createBoards } from "./utils";
import { Logo, Button, Icon, IconButton, Number } from "./Elements";
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
  const [timer, setTimer] = useState(config.timer);
  const [grid, setGrid] = useState(true);

  useEffect(() => {
    const n = numbers.reduce((accumulator, item) => {
      if (!item.active) accumulator.push(item.number);
      return accumulator;
    }, []);
    setAvailableNumbers(n);

    if (playing && n.length === 0) setWinner(true);
  }, [numbers, playing]);

  const pickNumber = useCallback(() => {
    const rand = Math.floor(Math.random() * availableNumbers.length);

    const pickedNumber = availableNumbers[rand];
    setLastNumber(pickedNumber);

    const newList = numbers;
    newList[pickedNumber].active = true;
    setNumbers([...newList]);
  }, [availableNumbers, numbers]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing && timer && !winner) pickNumber();
    }, config.timerInterval);
    return () => clearInterval(interval);
  }, [playing, timer, winner, pickNumber]);

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

  const toggleHints = () => {
    setHints(prevState => !prevState);
  };

  const toggleTimer = () => {
    setTimer(prevState => !prevState);
  };

  const toggleGrid = () => {
    setGrid(prevState => !prevState);
  };

  return (
    <div className="items-center text-center min-h-screen w-full md:flex">
      <div className="m-8 md:w-1/3">
        {!playing ? (
          <div className="m-2 text-center items-center">
            <Logo />

            <h3 className="mb-6 text-center text-6xl text-gray-800">
              {boards.length}
              <span className="m-auto block text-sm">Jugadores</span>
            </h3>

            <Button onClick={removeBoard} className="mr-2">
              -
            </Button>
            <Button onClick={addBoard}>+</Button>
            <Button
              onClick={startGame}
              color="red"
              className="m-auto mt-4 block"
            >
              Comenzar
            </Button>

            <hr className="m-8" />
            <div>
              <strong>Aclaración:</strong> Este Bingo fue realizado para jugar
              en familia o con amigos, compartiendo pantalla y usando
              anotaciones como las de ZOOM.
            </div>
            <p className="m-8">
              <img src="/images/zoom-stamp.png" alt="zoom stamp" />
              <img src="/images/zoom-bar.png" alt="zoom bar" />
            </p>
          </div>
        ) : (
          <div className="m-2">
            <h3 className="mb-2 text-center text-6xl text-gray-800">
              {lastNumber || "-"}
            </h3>

            <div className="mb-6 text-center">
              {!winner ? (
                <Button color="red" onClick={pickNumber}>
                  Sacar bolilla
                </Button>
              ) : (
                <Button color="purple" onClick={() => setPlaying(false)}>
                  Nueva partida
                </Button>
              )}
              <br />
              <IconButton onClick={toggleTimer}>
                <Icon>timer_3</Icon>{" "}
                {timer ? <Icon>timelapse</Icon> : <Icon>timer_off</Icon>}
              </IconButton>

              <IconButton onClick={toggleGrid}>
                {grid ? <Icon>grid_off</Icon> : <Icon>grid_on</Icon>}
              </IconButton>

              <IconButton onClick={toggleHints}>
                {hints ? <Icon>visibility_off</Icon> : <Icon>visibility</Icon>}
              </IconButton>
            </div>

            {grid
              ? numbers.map(item => (
                  <Number key={item.number} active={item.active}>
                    {item.number}
                  </Number>
                ))
              : null}
          </div>
        )}
      </div>

      <div className="md:w-2/3">
        {playing ? (
          <div className="flex justify-center flex-wrap m-8">
            {boards.map(board => (
              <div className="w-1/3" key={board.id}>
                <Board data={board} showHints={hints} />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative bg-gray-500 w-full h-64 md:min-h-screen">
            <img
              src="/images/cover.jpg"
              alt="zoom stamp"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
        )}
      </div>
    </div>
  );
}
