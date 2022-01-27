import { useSelector } from "react-redux";
import { selectPlayerHasAdvantage, selectPlayerScore, selectPointBeforeWin } from "./selectors";


export function PlayerScore({ playerId, playerName}) {
    const score = useSelector(selectPlayerScore(playerId))
    const hasAdvantage = useSelector(selectPlayerHasAdvantage(playerId))
    const pointBeforeWin = useSelector(selectPointBeforeWin(playerId))

    return (
        <div className="player-score">
            <p>
                {playerName}
                {pointBeforeWin === null ? "" : `(encore ${pointBeforeWin} ${pointBeforeWin > 1 ? "points" : "point"})`}
            </p>
            <p>{(hasAdvantage ? "Avantage " : "") + score}</p>
        </div>
    )
}