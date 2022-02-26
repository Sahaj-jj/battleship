import Gameboard from "./Gameboard"

const Player = (name, displayName) => {
  return {
    name,
    displayName,
    gameboard: Gameboard(10),
    isActive: false,
  };
}

export default Player;