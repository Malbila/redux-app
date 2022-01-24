import { useStore } from "react-redux";
import { setPlaying, pointScored } from './store'

export function PlayPauseButton() {
    const store = useStore()

    return (
        <button
        className="button"
        onClick={() => {
                const isPlaying = store.getState().playing
                if(isPlaying) {
                    return
                }
                store.dispatch(setPlaying(true))
                window.setTimeout(() => {
                    if(store.getState().playing === false) {
                        return
                    }
                    const pointWinner = Math.random() > 0.5 ? "player1" : "player2"
                    store.dispatch(pointScored(pointWinner))
                    store.dispatch(setPlaying(false))
                }, 2000)
        }}
        >
            Pause / Reprendre
        </button>
    )
}