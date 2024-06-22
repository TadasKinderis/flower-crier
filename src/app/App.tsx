"use client";

import { useState } from "react";
import InfoField from "./InfoField";
import MainGrid from "./MainGrid";
import {
  Player,
  Role,
  StorytellerChoice,
  StorytellerInfo,
  World,
} from "./Models";

export default function App() {
  const [players, setPlayers] = useState<Player[]>(initPlayers());
  const [storytellerInfo, setStorytellerInfo] = useState<StorytellerInfo[]>([
    { voted: StorytellerChoice.Unknown, nominated: StorytellerChoice.Unknown },
  ]);
  const [worlds, setWorlds] = useState(buildPossibleWorlds(players.length));

  const addDay = () => {
    if (storytellerInfo.length >= 10) return;

    const updatedPlayers = players.map((player) => ({
      ...player,
      votingDays: [...player.votingDays, { voted: false, nominated: false }],
    }));
    const updatedStorytellerInfo = [
      ...storytellerInfo,
      {
        voted: StorytellerChoice.Unknown,
        nominated: StorytellerChoice.Unknown,
      },
    ];
    const finalPlayers = CalculateProbs(updatedPlayers, worlds);
    setPlayers(finalPlayers);
    setStorytellerInfo(updatedStorytellerInfo);
  };

  const addPlayer = () => {
    if (players.length >= 15) return;

    const dayCount = storytellerInfo.length;
    const newPlayer = {
      name: "Player " + players.length,
      roles: Role.Townsfolk | Role.Minion | Role.Demon,
      votingDays: Array(dayCount).fill({
        voted: false,
        nominated: false,
      }),
      possibilities: {
        evilWorlds: 0,
        minionWorlds: 0,
        demonWorlds: 0,
      },
    };
    const newPlayers = [...players, newPlayer];
    const possibleWorlds = buildPossibleWorlds(newPlayers.length);
    const finalPlayers = CalculateProbs(newPlayers, possibleWorlds);
    setPlayers(finalPlayers);
    setWorlds(possibleWorlds);
  };

  const modifyPlayer = (index: number, updated: Player) => {
    const updatedPlayers = players.map((player, oldIndex) =>
      oldIndex === index ? updated : player
    );
    const newWorlds = ValidateWorlds(worlds, updatedPlayers, storytellerInfo);
    const finalPlayers = CalculateProbs(updatedPlayers, newWorlds);
    setPlayers(finalPlayers);
    setWorlds(newWorlds);
  };

  const modifyStorytellerInfo = (updated: StorytellerInfo[]) => {
    const newWorlds = ValidateWorlds(worlds, players, updated);
    const finalPlayers = CalculateProbs(players, newWorlds);
    setStorytellerInfo(updated);
    setPlayers(finalPlayers);
    setWorlds(newWorlds);
  };

  return (
    <div>
      <div className="block">
        <InfoField playerCount={players.length} worlds={worlds} />
      </div>
      <div className="block">
        <MainGrid
          players={players}
          storytellerInfo={storytellerInfo}
          validWorldCount={worlds.filter((w) => w.valid).length}
          modifyPlayer={modifyPlayer}
          setStorytellerInfo={modifyStorytellerInfo}
        />
      </div>
      <div className="buttons">
        <button className="button is-primary" onClick={addPlayer}>
          Add Player
        </button>
        <button className="button is-primary" onClick={addDay}>
          Add Day
        </button>
      </div>
    </div>
  );
}

function initPlayers(): Player[] {
  const initialPlayers: Player[] = [];
  for (let index = 0; index < 7; index++) {
    const newPlayer = {
      name: "Player " + index,
      roles: Role.Townsfolk | Role.Minion | Role.Demon,
      votingDays: [{ voted: false, nominated: false }],
      possibilities: { evilWorlds: 12, minionWorlds: 6, demonWorlds: 6 },
    };
    initialPlayers.push(newPlayer);
  }

  return initialPlayers;
}

function buildPossibleWorlds(playerCount: number): World[] {
  let worlds: World[] = [];
  const minionCount = playerCount < 10 ? 1 : playerCount < 13 ? 2 : 3;
  switch (minionCount) {
    case 1:
      worlds = buildOneMinionWorlds(playerCount - 1);
      break;
    case 2:
      worlds = buildTwoMinionWorlds(playerCount - 1);
      break;
    case 3:
      worlds = buildThreeMinionWorlds(playerCount - 1);
      break;
  }
  worlds = addDemonWorlds(worlds);
  return worlds;
}

function buildOneMinionWorlds(playerCount: number): World[] {
  const result = [];
  for (let index = 0; index < playerCount; index++) {
    const world = buildEmptyWorld(playerCount);
    world.roles[index] = Role.Minion;
    result.push(world);
  }
  return result;
}

function buildTwoMinionWorlds(playerCount: number): World[] {
  const result = [];
  for (let index = 0; index < playerCount; index++) {
    for (let index2 = index + 1; index2 < playerCount; index2++) {
      const world = buildEmptyWorld(playerCount);
      world.roles[index] = Role.Minion;
      world.roles[index2] = Role.Minion;
      result.push(world);
    }
  }
  return result;
}

function buildThreeMinionWorlds(playerCount: number): World[] {
  const result = [];
  for (let index = 0; index < playerCount; index++) {
    for (let index2 = index + 1; index2 < playerCount; index2++) {
      for (let index3 = index2 + 1; index3 < playerCount; index3++) {
        const world = buildEmptyWorld(playerCount);
        world.roles[index] = Role.Minion;
        world.roles[index2] = Role.Minion;
        world.roles[index3] = Role.Minion;
        result.push(world);
      }
    }
  }
  return result;
}

function addDemonWorlds(worlds: World[]): World[] {
  const result: World[] = [];
  worlds.map((world) => {
    for (let index = 0; index < world.roles.length + 1; index++) {
      const newWorld = {
        roles: world.roles.toSpliced(index, 0, Role.Demon),
        valid: true,
      };
      result.push(newWorld);
    }
  });
  return result;
}

function buildEmptyWorld(playerCount: number): World {
  return {
    roles: Array(playerCount).fill(Role.Townsfolk),
    valid: true,
  };
}

function ValidateWorlds(
  oldWorlds: World[],
  players: Player[],
  info: StorytellerInfo[]
): World[] {
  return oldWorlds.map((world) => ({
    roles: world.roles,
    valid: ValidateWorld(world, players, info),
  }));
}

function ValidateWorld(
  world: World,
  players: Player[],
  info: StorytellerInfo[]
): boolean {
  for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
    const player = players[playerIndex];
    const playerRole = world.roles[playerIndex];
    for (let dayIndex = 0; dayIndex < info.length; dayIndex++) {
      if (!IsRolePossible(playerRole, player, info, dayIndex)) return false;
    }
  }
  return true;
}

function IsRolePossible(
  playerRole: Role,
  player: Player,
  dayInfo: StorytellerInfo[],
  dayIndex: number
): boolean {
  if ((player.roles & playerRole) !== playerRole) return false;

  switch (playerRole) {
    case Role.Demon:
      if (dayInfo[dayIndex].voted === StorytellerChoice.Unknown) return true;
      if (
        dayInfo[dayIndex].voted === StorytellerChoice.True &&
        player.votingDays[dayIndex].voted
      )
        return true;
      if (
        dayInfo[dayIndex].voted === StorytellerChoice.False &&
        !player.votingDays[dayIndex].voted
      )
        return true;
      return false;
    case Role.Minion:
      if (dayInfo[dayIndex].nominated === StorytellerChoice.Unknown)
        return true;
      if (
        dayInfo[dayIndex].nominated === StorytellerChoice.True &&
        player.votingDays[dayIndex].nominated
      )
        return true;
      if (
        dayInfo[dayIndex].nominated === StorytellerChoice.False &&
        !player.votingDays[dayIndex].nominated
      )
        return true;
      return false;

    default:
      return true;
  }
}

function CalculateProbs(players: Player[], worlds: World[]): Player[] {
  return players.map((player, index) => {
    const minionWorlds = worlds.filter(
      (world) =>
        world.valid && (world.roles[index] & Role.Minion) === Role.Minion
    ).length;
    const demonWorlds = worlds.filter(
      (world) => world.valid && (world.roles[index] & Role.Demon) === Role.Demon
    ).length;
    return {
      ...player,
      possibilities: {
        evilWorlds: minionWorlds + demonWorlds,
        minionWorlds: minionWorlds,
        demonWorlds: demonWorlds,
      },
    };
  });
}
