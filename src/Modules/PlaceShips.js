import GameController from "./GameController";
import Player from "../Factories/Player";
import Ship from "../Factories/Ship";

const PlaceShips = (() => {
  const player = Player('sample');
  const ships = [Ship(4, 'ak'), Ship(2, 'b'), Ship(5, 'c'), Ship(4, 'd'), Ship(2, 'e')];
  let current = {
    shipNum: 0,
    shipCoordsArray: [],
    axis: 'x'
  };
  const $modal = document.querySelector('.modal')
  const $sampleGameBoard = document.querySelector('.sample');

  // Util 

  const decodeCoords = (coordsString) => {
    const coordsArray = coordsString.split(' ');
    return {x: +coordsArray[0], y: +coordsArray[1]};
  }

  const cellAt = (coords) => {
    return document.querySelector(`[data-coords="${coords.x} ${coords.y}"]`);
  }

  // DOM

  const newCellDOM = (cell) => {
    const $cell = document.createElement('div');
    $cell.classList.add('cell');
    $cell.setAttribute('data-coords', `${cell.coords.x} ${cell.coords.y}`);
    addCellListener($cell);
    return $cell;
  }

  const addCellListener = async ($cell) => {
    $cell.addEventListener('click', () => {
      placeShip(decodeCoords($cell.getAttribute('data-coords')), current.axis);
      Promise.resolve(decodeCoords($cell.getAttribute('data-coords')));
    });

    $cell.addEventListener('mouseover', () => {
      showShip(decodeCoords($cell.getAttribute('data-coords')), current.axis);
    });
  }



  const showShip = (coords, axis) => {
    if (current.shipCoordsArray.length !== 0) {
      current.shipCoordsArray.forEach(coords => {
        cellAt(coords).classList.remove('temp');
        cellAt(coords).classList.remove('invalid');
      })
    }
    current.shipCoordsArray = [];
    makeShip(coords, axis);
    if (!isShipValid()) {
      current.shipCoordsArray.forEach(coords => {
        cellAt(coords).classList.add("invalid");
      })
    }
    current.shipCoordsArray.forEach(coords => {
      cellAt(coords).classList.add("temp");
    })
  }

  const makeShip = (coords, axis) => {
    let newCoords = coords;
    for (let i = 0; i < ships[current.shipNum].getLength(); i++) {
      current.shipCoordsArray.push({x: newCoords.x, y: newCoords.y});
      axis === 'x' ? newCoords.x++: newCoords.y++;
      if (newCoords.x > 9 || newCoords.y > 9) break;
    }
  }

  const isShipValid = () => {
    return (!player.gameboard.isCollisions(current.shipCoordsArray) && current.shipCoordsArray.length === ships[current.shipNum].getLength());
  }

  const renderGameboard = (player, playerName, board) => {
    let $board = $sampleGameBoard;
    $board.classList.add(playerName);
    board.forEach(cell => $board.appendChild(newCellDOM(cell)));
  }

  const placeShip = (coords, axis) => {
    if (!isShipValid()) return;
    player.gameboard.setShip(ships[current.shipNum++], coords, axis);
    current.shipCoordsArray.forEach(coords => {
      const $cell = cellAt(coords);
      $cell.classList.add('ship');
      $cell.classList.remove('temp');
    })
    if (current.shipNum === ships.length - 1) {
      $modal.remove();
      GameController.init();
    }
  }

  const getSamplePlayer = () => player;

  const init = () => {
    renderGameboard('sample', player.name, player.gameboard.getBoard());
    document.addEventListener('keyup', ({ key }) => {
      if (key === 'R' || key === 'r') {
        current.axis = current.axis === 'x' ? 'y': 'x';
        showShip(current.shipCoordsArray[0], current.axis);
      }
    });
  }

  return {
    init,
    getSamplePlayer,
  }

})();

export default PlaceShips;