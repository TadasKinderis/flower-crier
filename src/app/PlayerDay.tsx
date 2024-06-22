import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VotingInfo } from "./Models";
import { faHand, faHandPointRight } from "@fortawesome/free-solid-svg-icons";

interface PlayerDayProps {
  index: number;
  votingInfo: VotingInfo;
  toggleVoting: (dayIndex: number, votingInfo: VotingInfo) => void;
}

export default function PlayerDay(props: PlayerDayProps) {
  const { index, votingInfo, toggleVoting } = props;
  return (
    <td>
      <div className="buttons">
        <button
          className={
            "button is-primary " + (votingInfo.voted ? "" : "is-light")
          }
          onClick={() =>
            toggleVoting(index, { ...votingInfo, voted: !votingInfo.voted })
          }
        >
          <span className="icon">
            <FontAwesomeIcon icon={faHand} />
          </span>
        </button>
        <button
          className={
            "button is-primary " + (votingInfo.nominated ? "" : "is-light")
          }
          onClick={() =>
            toggleVoting(index, {
              ...votingInfo,
              nominated: !votingInfo.nominated,
            })
          }
        >
          <span className="icon">
            <FontAwesomeIcon icon={faHandPointRight} />
          </span>
        </button>
      </div>
    </td>
  );
}
