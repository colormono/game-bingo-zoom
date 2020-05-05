import { initPlayers, newPlayer } from "./utils";
import config from "./config";
import db from "./db";

const initialState = {
  ...db[0],
  lastNumber: false,
  boards: initPlayers(),
  playing: false,
  lastWinner: false,
  party: false,
  autoplay: false,
  showHints: false,
  showGrid: true
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

    case "SET_BOARDS":
      return {
        ...state,
        ...db[action.payload]
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
        party: true,
        lastWinner: action.payload
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

export { reducer, initialState };
