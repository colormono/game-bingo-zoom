import React, { useEffect, useCallback, useReducer } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "confetti-react";
import config from "./config";
import { dbNumbers } from "./db";
import { initPlayers, newPlayer, createBoards } from "./utils";
import { Logo, Button, Icon, IconButton, Number, Credits } from "./Elements";
import Board from "./Board";
import "./styles.css";

const initialState = {
  numbers: dbNumbers,
  lastNumber: false,
  boards: initPlayers(),
  playing: false,
  winner: false,
  colorWinner: false, //lastWinner
  party: false,
  timer: false, // useTimer
  hints: false, //showHints
  grid: true // showGrid
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_BOARD":
      return {
        ...state,
        boards:
          state.boards.length < config.maxPlayers
            ? [...state.boards, newPlayer()]
            : state.boards
      };

    case "REMOVE_BOARD":
      return {
        ...state,
        boards:
          state.boards.length > config.minPlayers
            ? state.boards.slice(0, state.boards.length - 1)
            : state.boards
      };

    case "START_GAME":
      return {
        ...state,
        boards: action.payload,
        playing: true
      };

    case "PICKED_NUMBER":
      return {
        ...state,
        ...action.payload
      };

    case "TOGGLE_FEATURE":
      return {
        ...state,
        ...action.payload
      };

    case "SET_WINNER":
      return {
        ...state,
        winner: true,
        party: true,
        colorWinner: action.payload
      };

    case "PARTY_OVER":
      return {
        ...state,
        party: false
      };

    case "RESTART_GAME": {
      return initialState;
    }

    default:
      throw new Error();
  }
}

export default function App() {
  const { width, height } = useWindowSize();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { playing, numbers, lastNumber, timer, winner } = state;

  const pickNumber = useCallback(() => {
    if (playing) {
      const availableNumbers = [
        ...numbers.reduce((accumulator, item) => {
          if (!item.active) accumulator.push(item.id);
          return accumulator;
        }, [])
      ];

      const rand = Math.floor(Math.random() * availableNumbers.length);
      const pickedNumber = availableNumbers[rand];

      const newList = [...numbers];
      newList[pickedNumber].active = true;

      dispatch({
        type: "PICKED_NUMBER",
        payload: {
          numbers: newList,
          lastNumber: newList[pickedNumber]
        }
      });
    }
  }, [numbers, playing]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing && timer && !winner) pickNumber();
    }, config.timerInterval);

    return () => clearInterval(interval);
  }, [playing, timer, winner, pickNumber]);

  const startGame = () => {
    const newBoards = createBoards(state.boards, numbers, config.difficulty);
    dispatch({ type: "START_GAME", payload: newBoards });
  };

  const restartGame = () => {
    numbers.map(item => (item.active = false));
    return dispatch({ type: "RESTART_GAME" });
  };

  const setWinner = c => {
    if (!state.colorWinner) dispatch({ type: "SET_WINNER", payload: c });
  };

  const renderAppBanner = () => (
    <div className="relative bg-gray-500 w-full h-32 lg:min-h-screen">
      <img
        src="/images/cover.jpg"
        alt="ZOOM"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>
  );

  const renderAppMenu = () => (
    <div className="mx-4 my-8 md:my-16 text-center text-gray-700">
      <Logo />

      <p className="mx-auto mb-8 max-w-md">
        <strong>Hola,</strong> armamos este Bingo para jugar con familia o
        amigos, compartiendo pantalla y usando anotaciones como las de{" "}
        <em>ZOOM</em>.
      </p>

      <h3 className="mb-6 flex items-center justify-center text-6xl">
        {state.boards.length}
        <span className="material-icons ml-4">insert_emoticon</span>
      </h3>

      <Button
        onClick={() => dispatch({ type: "REMOVE_BOARD" })}
        className="mr-2 leading-none text-2xl"
      >
        -
      </Button>
      <Button
        onClick={() => dispatch({ type: "ADD_BOARD" })}
        className="leading-none text-2xl"
      >
        +
      </Button>
      <Button
        onClick={startGame}
        color="red"
        className="text-2xl m-auto mt-4 block"
      >
        JUGAR
      </Button>

      <hr className="m-8" />
      <Credits />
    </div>
  );

  const renderGameMenu = () => (
    <div className="m-2 text-center">
      {!winner ? (
        <>
          <h3 className="text-6xl text-gray-700 leading-tight my-4">
            {lastNumber ? (
              <>
                {lastNumber.number}
                <div className="text-xl text-gray-700 italic">
                  "{lastNumber.hint}"
                </div>
              </>
            ) : (
              "-"
            )}
          </h3>

          <Button color="red" onClick={pickNumber}>
            Sacar bolilla
          </Button>
        </>
      ) : (
        <>
          <h3 className="flex items-center justify-center text-4xl text-gray-700 my-2">
            <span role="img" aria-label="winner" className="m-1">
              🎉
            </span>
            <span role="img" aria-label="winner" className="m-1">
              👉
            </span>
            <span
              className={`inline-block rounded-full mx-4 h-8 w-8 bg-${
                state.colorWinner
              }-500 shadow-lg`}
            />
            <span role="img" aria-label="party" className="m-1">
              👏
            </span>
          </h3>

          {!state.party ? (
            <Button color="purple" onClick={restartGame}>
              Nueva partida
            </Button>
          ) : null}
        </>
      )}

      <div className="my-2">
        <IconButton
          onClick={() =>
            dispatch({
              type: "TOGGLE_FEATURE",
              payload: {
                timer: !state.timer
              }
            })
          }
        >
          {state.timer ? <Icon>pause</Icon> : <Icon>play_arrow</Icon>}
        </IconButton>

        <IconButton
          onClick={() =>
            dispatch({
              type: "TOGGLE_FEATURE",
              payload: {
                grid: !state.grid
              }
            })
          }
        >
          {state.grid ? <Icon>grid_off</Icon> : <Icon>grid_on</Icon>}
        </IconButton>

        <IconButton
          onClick={() =>
            dispatch({
              type: "TOGGLE_FEATURE",
              payload: {
                hints: !state.hints
              }
            })
          }
        >
          {state.hints ? <Icon>visibility_off</Icon> : <Icon>visibility</Icon>}
        </IconButton>

        <IconButton onClick={restartGame}>
          <Icon>cached</Icon>
        </IconButton>
      </div>

      {state.grid
        ? numbers.map(item => (
            <Number key={item.id} active={item.active}>
              {item.id}
            </Number>
          ))
        : null}
    </div>
  );

  const renderGameBoards = () => (
    <div className="flex flex-col items-center justify-center sm:flex-row flex-wrap mx-3">
      {state.boards.map(board => (
        <div className="sm:w-1/2" key={board.id}>
          <Board data={board} showHints={state.hints} setWinner={setWinner} />
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
      <Confetti
        width={width}
        height={height}
        // style={{ pointerEvents: "none" }}
        colors={[
          "#A0AEC0",
          "#F56565",
          "#ED8936",
          "#ECC94B",
          "#48BB78",
          "#38B2AC",
          "#4299E1",
          "#667EEA",
          "#9F7AEA",
          "#ED64A6"
        ]}
        numberOfPieces={state.party ? 500 : 0}
        recycle={false}
        onConfettiComplete={confetti => {
          dispatch({ type: "PARTY_OVER" });
          confetti.reset();
        }}
      />
      <div className="lg:w-1/3 xl:w-1/4">{renderGameMenu()}</div>
      <div className="lg:w-2/3 xl:w-3/4">{renderGameBoards()}</div>
    </div>
  );
}
