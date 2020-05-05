import React, { useEffect, useCallback, useReducer } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "confetti-react";
import { reducer, initialState } from "./store";
import db from "./db";
import { createBoards } from "./utils";
import config from "./config";
import {
  Logo,
  Button,
  Icon,
  IconButton,
  Number,
  Credits
} from "./components/Elements";
import LastPicked from "./components/LastPicked";
import Spinner from "./components/Spinner";
import Board from "./components/Board";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

export default function App() {
  const { width, height } = useWindowSize();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { playing, options, lastNumber, lastWinner, autoplay } = state;

  const pickNumber = useCallback(() => {
    if (playing) {
      const availableNumbers = [
        ...options.reduce((accumulator, item) => {
          if (!item.active) accumulator.push(item.id);
          return accumulator;
        }, [])
      ];

      const rand = Math.floor(Math.random() * availableNumbers.length);
      const pickedNumber = availableNumbers[rand];

      const newList = [...options];
      newList[pickedNumber].active = true;

      dispatch({
        type: "PICKED_NUMBER",
        payload: {
          options: newList,
          lastNumber: newList[pickedNumber]
        }
      });
    }
  }, [options, playing]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing && autoplay && !lastWinner) pickNumber();
    }, config.timerInterval);

    return () => clearInterval(interval);
  }, [playing, autoplay, lastWinner, pickNumber]);

  const startGame = () => {
    const newBoards = createBoards(state.boards, options, state.difficulty);
    dispatch({ type: "START_GAME", payload: newBoards });
  };

  const restartGame = () => {
    options.map(item => (item.active = false));
    return dispatch({ type: "RESTART_GAME" });
  };

  const setWinner = c => {
    if (!state.lastWinner) dispatch({ type: "SET_WINNER", payload: c });
  };

  const handleChange = event => {
    dispatch({ type: "SET_BOARDS", payload: event.target.value });
  };

  const renderAppMenu = () => (
    <div className="mx-4 my-8 md:my-16 text-center text-gray-700">
      <Logo />

      <p className="mx-auto mb-8 max-w-md">
        <strong>Hola,</strong> armamos este Bingo para jugar con familia o
        amigos, compartiendo pantalla y usando anotaciones como las de{" "}
        <em>ZOOM</em>.
      </p>

      <form>
        <label>
          <select
            value={state.value}
            onChange={handleChange}
            className="inline-block text-xl"
          >
            {db.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <h3 className="flex font-semibold items-center justify-center text-6xl">
          {state.boards.length}
          <span role="img" aria-label="players" className="ml-2 text-3xl">
            😀
          </span>
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
      </form>

      <hr className="m-8" />
      <Credits />
    </div>
  );

  const renderGameMenu = () => (
    <div className="m-2 text-center">
      {!lastWinner ? (
        <>
          <LastPicked lastNumber={lastNumber} useImages={state.useImages} />
          <Spinner trigger={autoplay} />
          <Button color="red" className="tracking-wide" onClick={pickNumber}>
            SACAR BOLILLA
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
                state.lastWinner
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
          onClick={() => {
            if (!state.autoplay) pickNumber();

            dispatch({
              type: "TOGGLE_FEATURE",
              payload: {
                autoplay: !state.autoplay
              }
            });
          }}
        >
          {state.autoplay ? <Icon>pause</Icon> : <Icon>play_arrow</Icon>}
        </IconButton>

        <IconButton
          onClick={() =>
            dispatch({
              type: "TOGGLE_FEATURE",
              payload: {
                showGrid: !state.showGrid
              }
            })
          }
        >
          {state.showGrid ? <Icon>grid_off</Icon> : <Icon>grid_on</Icon>}
        </IconButton>

        <IconButton
          onClick={() =>
            dispatch({
              type: "TOGGLE_FEATURE",
              payload: {
                showHints: !state.showHints
              }
            })
          }
        >
          {state.showHints ? (
            <Icon>visibility_off</Icon>
          ) : (
            <Icon>visibility</Icon>
          )}
        </IconButton>

        <IconButton onClick={restartGame}>
          <Icon>cached</Icon>
        </IconButton>
      </div>

      {state.showGrid
        ? options.map(item =>
            state.useImages ? (
              <div
                key={item.id}
                className={`p-1 inline-block bg-white rounded-md shadow-sm opacity-${
                  item.active ? "100" : "25"
                }`}
              >
                <img src={item.option} alt={item.hint} className="w-10 h-10" />
              </div>
            ) : (
              <Number key={item.id} active={item.active}>
                {item.option}
              </Number>
            )
          )
        : null}
    </div>
  );

  const renderGameBoards = () => (
    <div className="flex flex-col items-center justify-center sm:flex-row flex-wrap mx-3">
      {state.boards.map(board => (
        <div className="sm:w-auto" key={board.id}>
          <Board
            data={board}
            setWinner={setWinner}
            useImages={state.useImages}
          />
        </div>
      ))}
    </div>
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className="font-sans aliasing bg-gray-100">
          {!playing ? (
            <div className="flex flex-col lg:flex-row-reverse">
              <div className="lg:w-1/2">
                <div className="relative bg-gray-500 w-full h-32 lg:min-h-screen">
                  <img
                    src="/images/cover.jpg"
                    alt="ZOOM"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </div>
              </div>
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
          )}
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}
