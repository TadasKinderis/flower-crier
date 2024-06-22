import { World } from "./Models";

interface InfoFieldProps {
  playerCount: number;
  worlds: World[];
}

export default function InfoField(props: InfoFieldProps) {
  const { playerCount, worlds } = props;
  return (
    <div className="columns is-vcentered is-centered">
      <div className="column"></div>
      <div className="column">Player count: {playerCount}</div>
      <div className="column">
        Valid Worlds: {worlds.filter((w) => w.valid).length}
      </div>
      <div className="column">Total Worlds: {worlds.length}</div>
      <div className="column"></div>
    </div>
  );
}
