import { Role } from "./Models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faD, faM, faHouseChimney } from "@fortawesome/free-solid-svg-icons";

interface RoleButtons {
  role: Role;
  toggleRole: (role: Role) => void;
}

export default function RoleButtons({ role, toggleRole }: RoleButtons) {
  const isTownsfolk = (role & Role.Townsfolk) === Role.Townsfolk;
  const isMinion = (role & Role.Minion) === Role.Minion;
  const isDemon = (role & Role.Demon) === Role.Demon;
  return (
    <div className="buttons has-addons">
      <button
        className={"button is-info " + (isTownsfolk ? "" : "is-light")}
        onClick={() => toggleRole(Role.Townsfolk)}
      >
        <span className="icon">
          <FontAwesomeIcon icon={faHouseChimney} />
        </span>
      </button>
      <button
        className={"button is-danger " + (isMinion ? "" : "is-light")}
        onClick={() => toggleRole(Role.Minion)}
      >
        <span className="icon">
          <FontAwesomeIcon icon={faM} />
        </span>
      </button>
      <button
        className={"button is-danger " + (isDemon ? "is-dark" : "is-light")}
        onClick={() => toggleRole(Role.Demon)}
      >
        <span className="icon">
          <FontAwesomeIcon icon={faD} />
        </span>
      </button>
    </div>
  );
}
