import PlayerRow from "./PlayerRow";
import { Player, StorytellerChoice, StorytellerInfo } from "./Models";
import StorytellerInfoCell from "./StorytellerInfoCell";

interface MainGridProps {
  players: Player[];
  storytellerInfo: StorytellerInfo[];
  validWorldCount: number;
  modifyPlayer: (index: number, updated: Player) => void;
  setStorytellerInfo: (updated: StorytellerInfo[]) => void;
}

export default function MainGrid(props: MainGridProps) {
  const {
    players,
    storytellerInfo,
    validWorldCount,
    modifyPlayer,
    setStorytellerInfo,
  } = props;

  const changeVotedChoice = (dayIndex: number, choice: StorytellerChoice) => {
    const updatedInfo = storytellerInfo.map((oldInfo, index) =>
      index === dayIndex ? { ...oldInfo, voted: choice } : oldInfo
    );
    setStorytellerInfo(updatedInfo);
  };

  const changeNominatedChoice = (
    dayIndex: number,
    choice: StorytellerChoice
  ) => {
    const updatedInfo = storytellerInfo.map((oldInfo, index) =>
      index === dayIndex ? { ...oldInfo, nominated: choice } : oldInfo
    );
    setStorytellerInfo(updatedInfo);
  };

  const playerRows = players.map((player, index) => (
    <PlayerRow
      key={index}
      index={index}
      player={player}
      validWorldCount={validWorldCount}
      modifyPlayer={modifyPlayer}
    />
  ));

  const storytellerVotedRows = storytellerInfo.map((info, index) => (
    <StorytellerInfoCell
      key={index}
      info={info.voted}
      index={index}
      changeChoice={changeVotedChoice}
    />
  ));

  const storytellerNominatedRows = storytellerInfo.map((info, index) => (
    <StorytellerInfoCell
      key={index}
      info={info.nominated}
      index={index}
      changeChoice={changeNominatedChoice}
    />
  ));

  return (
    <div className="block column">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roles</th>
            {players[0].votingDays.map((_day, index) => (
              <th key={index}>Day {index + 1}</th>
            ))}
            <td>Evil</td>
            <td>Minion</td>
            <td>Demon</td>
          </tr>
        </thead>
        <tbody>{playerRows}</tbody>
        <tfoot>
          <tr>
            <td>Demon Voted</td>
            <td></td>
            {storytellerVotedRows}
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Minion Nominated</td>
            <td></td>
            {storytellerNominatedRows}
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
