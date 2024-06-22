import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StorytellerChoice } from "./Models";
import {
  faQuestion,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

interface StorytellerInfoCellProps {
  index: number;
  info: StorytellerChoice;
  changeChoice: (dayIndex: number, choice: StorytellerChoice) => void;
}

export default function StorytellerInfoCell(props: StorytellerInfoCellProps) {
  const { index, info, changeChoice } = props;
  return (
    <td>
      <div className="buttons has-addons">
        <button
          className={
            "button is-success " +
            (info === StorytellerChoice.True ? "" : "is-light")
          }
          onClick={() => changeChoice(index, StorytellerChoice.True)}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faThumbsUp} />
          </span>
        </button>
        <button
          className={
            "button is-primary " +
            (info === StorytellerChoice.Unknown ? "" : "is-light")
          }
          onClick={() => changeChoice(index, StorytellerChoice.Unknown)}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faQuestion} />
          </span>
        </button>
        <button
          className={
            "button is-danger " +
            (info === StorytellerChoice.False ? "" : "is-light")
          }
          onClick={() => changeChoice(index, StorytellerChoice.False)}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faThumbsDown} />
          </span>
        </button>
      </div>
    </td>
  );
}
