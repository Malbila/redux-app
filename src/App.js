import { PlayPauseButton } from "./PlayPauseButton"
import { Display } from './Display'
import { ResetButton } from './ResetButton'
import { PointScoredButton } from './PointScoredButton'
import { PlayerScore } from "./PlayerScore";
import { PlayerPoints } from "./PlayerPoints";

export default function App() {
  return (
    <div>
      <PlayerPoints playerId="player1" playerName="player 1" />
      <PlayerPoints playerId="player2" playerName="player 2" />
      <Display />
      < PlayerScore playerId="player1" playerName="Joueur 1" />
      < PlayerScore playerId="player2" playerName="Joueur 2" />
      <div className='buttons-row'>
        <PointScoredButton playerId = "player1">
          Point joueur 1
        </PointScoredButton>
        <PointScoredButton playerId = "player2">
          Point joueur 2
        </PointScoredButton>
      </div>
      <div className='buttons-row'>
      <ResetButton />
      <PlayPauseButton />
      </div>
    </div>
  );
}

