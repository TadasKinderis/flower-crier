import { Player, Role, VotingInfo } from "./Models";
import PlayerDay from "./PlayerDay";
import ProbabilityLabel from "./ProbabilityLabel";
import RoleButtons from "./RoleButtons";

interface PlayerRowProps {
  index: number;
  player: Player;
  validWorldCount: number;
  modifyPlayer: (index: number, updated: Player) => void;
}

export default function PlayerRow(props: PlayerRowProps) {
  const { index, player, validWorldCount, modifyPlayer } = props;
  const { name, roles } = player;

  const toggleRole = (index: number, role: Role) => {
    const updated = { ...player, roles: (player.roles ^= role) };
    modifyPlayer(index, updated);
  };

  const toggleVoting = (
    playerIndex: number,
    dayIndex: number,
    votingInfo: VotingInfo
  ) => {
    const updatedVotingDays = player.votingDays.map((votingInfoOld, index) =>
      index === dayIndex ? votingInfo : votingInfoOld
    );
    const updated = { ...player, votingDays: updatedVotingDays };
    modifyPlayer(playerIndex, updated);
  };

  const playerDays = player.votingDays.map((day, dayIndex) => (
    <PlayerDay
      key={dayIndex}
      votingInfo={day}
      index={dayIndex}
      toggleVoting={(dayIndex, votingInfo) =>
        toggleVoting(index, dayIndex, votingInfo)
      }
    />
  ));

  return (
    <tr>
      <td>{name}</td>
      <td>
        <RoleButtons
          role={roles}
          toggleRole={(role) => toggleRole(index, role)}
        />
      </td>
      {playerDays}
      <td>
        <ProbabilityLabel
          validWorlds={player.possibilities.evilWorlds}
          totalWorlds={validWorldCount}
        />
      </td>
      <td>
        <ProbabilityLabel
          validWorlds={player.possibilities.minionWorlds}
          totalWorlds={validWorldCount}
        />
      </td>
      <td>
        <ProbabilityLabel
          validWorlds={player.possibilities.demonWorlds}
          totalWorlds={validWorldCount}
        />
      </td>
    </tr>
  );
}
