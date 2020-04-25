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

  const renderAppBanner = () => (
    <div className="relative bg-gray-500 w-full h-64 lg:min-h-screen">
      <img
        src="/images/cover.jpg"
        alt="ZOOM"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>
  );

  const renderAppMenu = () => (
    <div className="mx-4 my-16 text-center text-gray-700">
      <Logo />

      <p className="mx-auto mb-8 max-w-md">
        <strong>Hola,</strong> armamos este Bingo para jugar con familia o
        amigos, compartiendo pantalla y usando anotaciones como las de{" "}
        <em>ZOOM</em>.
      </p>

      <h3 className="mb-6 flex items-center justify-center text-6xl">
        {boards.length}
        <span className="material-icons ml-4">insert_emoticon</span>
      </h3>

      <Button onClick={removeBoard} className="mr-2 leading-none text-2xl">
        -
      </Button>
      <Button onClick={addBoard} className="leading-none text-2xl">
        +
      </Button>
      <Button
        onClick={startGame}
        color="red"
        className="text-2xl m-auto mt-4 block"
      >
        PLAY
      </Button>

      <hr className="m-8" />
      <p className="m-8 lg:mb-16">Creditos</p>
    </div>
  );

  const renderGameMenu = () => (
    <div className="m-2 text-center">
      <h3 className="text-6xl text-gray-700">{lastNumber || "-"}</h3>

      <div className="my-2">
        {!winner ? (
          <Button color="red" onClick={pickNumber}>
            Sacar bolilla
          </Button>
        ) : (
          <Button color="purple" onClick={() => setPlaying(false)}>
            Nueva partida
          </Button>
        )}
      </div>

      <div className="mb-2">
        <IconButton onClick={toggleTimer}>
          <Icon>timer_3</Icon>{" "}
          {timer ? <Icon>timer_off</Icon> : <Icon>timelapse</Icon>}
        </IconButton>

        <IconButton onClick={toggleGrid}>
          {grid ? <Icon>grid_off</Icon> : <Icon>grid_on</Icon>}
        </IconButton>

        <IconButton onClick={toggleHints}>
          {hints ? <Icon>visibility_off</Icon> : <Icon>visibility</Icon>}
        </IconButton>

        <IconButton onClick={() => setPlaying(false)}>
          <Icon>cached</Icon>
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
  );

  const renderGameBoards = () => (
    <div className="flex flex-col items-center justify-center sm:flex-row flex-wrap mx-3">
      {boards.map(board => (
        <div className="sm:w-1/2" key={board.id}>
          <Board data={board} showHints={hints} />
        </div>
      ))}
    </div>
  );

  return !playing ? (
    <div className="flex flex-col lg:flex-row-reverse">
      <div className="lg:w-1/2">{renderAppBanner()}</div>
      <div className="lg:w-1/2 lg:self-center">{renderAppMenu()}</div>
    </div>
  ) : (
    <div className="flex flex-col w-full items-center justify-center min-h-screen lg:flex-row">
      <div className="lg:w-1/3 xl:w-1/4">{renderGameMenu()}</div>
      <div className="lg:w-2/3 xl:w-3/4">{renderGameBoards()}</div>
    </div>
  );
}
