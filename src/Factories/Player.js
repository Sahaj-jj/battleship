import Gameboard from "./Gameboard"

const Player = (name) => {
  return {
    name,
    gameboard: Gameboard(10),
    isActive: false
  };
}

export default Player;