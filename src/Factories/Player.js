import Gameboard from "./Gameboard"

const Player = (name) => {
  return {
    name,
    gameboard: Gameboard(10),
    ships: [],
    isActive: false
  };
}

export default Player;