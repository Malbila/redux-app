import { createStore } from "redux";
import produce from "immer";

// state
const initialState = {
  player1: 0,
  player2: 0,
  advantage: null,
  winner: null,
  playing: false,
  history: [],
};

// actions creators

export const setPlaying = (playing) => ({
  type: "setPlaying",
  payload: playing,
 });

export const restartGame = () => ({ type: "restart" });

export const pointScored = (player) => ({
  type: "pointScored",
  payload: { player: player },
});

export function autoplay(store) {
  const isPlaying = store.getState().playing
  if(isPlaying || store.getState().winner) {
    //Déjà en train de jouer, on ne fait rien
    return
  }
  // On indique que la partie est en cours
  store.dispatch(setPlaying(true))
  playNextPoint()
  function playNextPoint() {
    if(store.getState().playing === false) {
      return
    }
    const time = 1000 + Math.floor(Math.random() *2000)
    window.setTimeout(() => {
      if(store.getState().playing === false) {
        return
      }
      //si oui on marque un point aléatoire
      const pointWinner = Math.random() > 0.5 ? "player1" : "player2"
      store.dispatch(pointScored(pointWinner))
      if(store.getState().winner) {
        store.dispatch(setPlaying(false))
        return
      }
      playNextPoint()
    }, time)
  }
}

function reducer(state = initialState, action) {
  if (action.type === "restart") {
    return produce(state, (draft) => {
      if(draft.winner) {
        draft.history.push({
          player1: draft.player1,
          player2: draft.player2,
          winner: draft.winner,
        })
      }

      draft.player1 = 0;
      draft.player2 = 0;
      draft.advantage = null;
      draft.winner = null;
      draft.playing = false;
    })
  }
  if(action.type === "setPlaying") {
    return produce(state, (draft) => {
      draft.playing = action.playing
    })
  }

  if (action.type === "pointScored") {
    const player = action.payload.player;
    const otherPlayer = player === "player1" ? "player2" : "player1";
    if (state.winner) {
      // On ne peut pas marquer de point si le set est terminé
      return state;
    }
    if (state.playing === false) {
      // On ne peut pas marquer de point si le set est en pause
      return state;
    }
    return produce(state, (draft) => {
      const currentPlayerScore = draft[player];
      if (currentPlayerScore <= 15) {
        draft[player] += 15
        return;
      }
      if (currentPlayerScore === 30) {
        draft[player] = 40
        return 
      }
      if (currentPlayerScore === 40) {
        if (draft[otherPlayer] !== 40) {
          // Le joueur à gagné
          draft.winner = player
          return 
          
        }
        if (state.advantage === player) {
          // Le joueur à gagné
          draft.winner = player
          return 
        }
        if (state.advantage === null) {
          // Le joueur a maintenant l'avantage
          draft.advantage = player
          return 
        }
        // L'autre joueur a perdu l'avantage
        draft.advantage = null
        return 
      }
    })
  }
  return state;
}

export const store = createStore(reducer);

store.subscribe(() => {
  console.log("New state: ")
  console.log(store.getState())
})