import GameController from "./GameController";
import Player from "../Factories/Player";
import Ship from "../Factories/Ship";
import UI from "./UI";

const PlaceShips = (() => {
  const player = Player('sample');
  const ships = [Ship(5, 'Carrier'), Ship(4, 'Battleship'), Ship(3, 'Cruiser'), Ship(3, 'Submarine'), Ship(2, 'Destroyer')];
  let current = {
    shipNum: 0,
    shipCoordsArray: [],
    axis: 'x'
  };
  const $modal = document.querySelector('.modal');
  const $playButton = document.querySelector('button.play');
  const $resetButton = document.querySelector('button.reset');

  // Util 

  const cellAt = (coords) => {
    return document.querySelector(`[data-coords="${coords.x} ${coords.y}"]`);
  }

  // DOM

  const showShip = (coords) => {
    if (current.shipNum >= ships.length) return;
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
    current.shipCoordsArray.forEach(coords => {
      cellAt(coords).classList.add('ship');
      cellAt(coords).classList.remove('temp');
    });
    UI.updateShipsDisplay(player.name, ships, current.shipNum - 1);
    if (current.shipNum === ships.length) {
      $playButton.style.display = 'block';
    }
  }

  const reset = () => {
    player.gameboard.reset();
    player.gameboard.getBoard().forEach(cell => {
      cellAt(cell.coords).classList.remove('ship');
      cellAt(cell.coords).classList.remove('temp');
    });
    const $shipContainers = Array.from(document.querySelector('.ships-display').children);
    $shipContainers.forEach($shipContainer => $shipContainer.classList.remove('sunk'));
    current = {
      shipNum: 0,
      shipCoordsArray: [],
      axis: 'x'
    };
    $playButton.style.display = 'none';
  }
  
  const getSamplePlayer = () => player;

  const init = () => {
    UI.renderGameboard('sample', player.name, player.gameboard.getBoard());
    UI.updateShipsDisplay(player.name, ships);

    document.addEventListener('keyup', ({ key }) => {
      if (key === 'R' || key === 'r') {
        current.axis = current.axis === 'x' ? 'y': 'x';
        showShip(current.shipCoordsArray[0], current.axis);
      }
    });

    $playButton.addEventListener('click', () => {
      $modal.remove();
      GameController.init();
    })

    $resetButton.addEventListener('click', reset);
  }

  return {
    init,
    placeShip,
    showShip,
    getSamplePlayer,
  }

})();

export default PlaceShips;