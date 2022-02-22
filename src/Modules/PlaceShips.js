import GameController from "./GameController";
import Player from "../Factories/Player";
import Ship from "../Factories/Ship";
import UI from "./UI";

const PlaceShips = (() => {
  const player = Player('sample');
  const ships = [Ship(4, 'ak'), Ship(2, 'b'), Ship(5, 'c'), Ship(4, 'd'), Ship(2, 'e')];
  let current = {
    shipNum: 0,
    shipCoordsArray: [],
    axis: 'x'
  };
  const $modal = document.querySelector('.modal')

  // Util 

  const cellAt = (coords) => {
    return document.querySelector(`[data-coords="${coords.x} ${coords.y}"]`);
  }

  // DOM

  const showShip = (coords) => {
    if (current.shipCoordsArray.length !== 0) {
      current.shipCoordsArray.forEach(coords => {
        cellAt(coords).classList.remove('temp');
        cellAt(coords).classList.remove('invalid');
      })
    }
    current.shipCoordsArray = makeShip(coords);
    current.shipCoordsArray.forEach(coords => {
      cellAt(coords).classList.add("temp");
    })
    if (!isShipValid()) {
      current.shipCoordsArray.forEach(coords => {
        cellAt(coords).classList.add("invalid");
      })
    }
  }

  const makeShip = (coords) => {
    let shipCoordsArray = [];
    let newCoords = coords;
    for (let i = 0; i < ships[current.shipNum].getLength(); i++) {
      shipCoordsArray.push({x: newCoords.x, y: newCoords.y});
      current.axis === 'x' ? newCoords.x++: newCoords.y++;
      if (newCoords.x > 9 || newCoords.y > 9) break;
    }
    return shipCoordsArray;
  }

  const isShipValid = () => {
    return (!player.gameboard.isCollisions(current.shipCoordsArray) && 
          current.shipCoordsArray.length === ships[current.shipNum].getLength());
  }

  
  const placeShip = (coords) => {
    if (!isShipValid()) return;
    player.gameboard.setShip(ships[current.shipNum++], coords, current.axis);
    current.shipCoordsArray.forEach(coords => cellAt(coords).classList.add('ship'));
    UI.renderGameboard('sample', player.name, player.gameboard.getBoard());
    if (current.shipNum === ships.length) {
      $modal.remove();
      GameController.init();
    }
  }
  
  const getSamplePlayer = () => player;

  const init = () => {
    UI.renderGameboard('sample', player.name, player.gameboard.getBoard());
    document.addEventListener('keyup', ({ key }) => {
      if (key === 'R' || key === 'r') {
        current.axis = current.axis === 'x' ? 'y': 'x';
        showShip(current.shipCoordsArray[0], current.axis);
      }
    });
  }

  return {
    init,
    placeShip,
    showShip,
    getSamplePlayer,
  }

})();

export default PlaceShips;