import GameController from "./GameController";
import Player from "../Factories/Player";
import Ship from "../Factories/Ship";

const PlaceShips = (() => {
  const player = Player('sample');
  const ships = [Ship(4, 'ak'), Ship(2, 'b'), Ship(5, 'c')];
  let current = {
    shipNum: 0,
    shipCoordsArray: [],
    axis: 'x'
  };
  const $modal = document.querySelector('.modal')
  const $sampleGameBoard = document.querySelector('.sample');
  const shipInfoArray = [];
  const shipInfo = (ship, coords, axis) => {
    return {
      ship,
      coords,
      axis
    };
  };

  const newCellDOM = (cell) => {
    const $cell = document.createElement('div');
    $cell.classList.add('cell');
    $cell.setAttribute('data-coords', `${cell.coords.x} ${cell.coords.y}`);
    addCellListener($cell);
    return $cell;
}

const addCellListener = ($cell) => {
  $cell.addEventListener('click', () => {
    const coordsArray = $cell.getAttribute('data-coords').split(' ');
    const coords = {x: +coordsArray[0], y: +coordsArray[1]};
    placeShip(coords, 'x');
  });

  $cell.addEventListener('mouseover', () => {
    const coordsArray = $cell.getAttribute('data-coords').split(' ');
    const coords = {x: +coordsArray[0], y: +coordsArray[1]};
    showShip(coords);
  });
}

// const cellAt = (coords) => {
//   return document.querySelector(`[data-coords="${coords.x} ${coords.y}"]`);
// }

const showShip = (coords) => {
  if (current.shipCoordsArray.length !== 0) {
    current.shipCoordsArray.forEach(coords => {
      document.querySelector(`.board > [data-coords="${coords.x} ${coords.y}"]`).classList.remove('temp');
    })
  }
  current.shipCoordsArray = [];
  let newCoords = coords;
  let axis = 'x';
  for (let i = 0; i < ships[current.shipNum].getLength(); i++) {
    current.shipCoordsArray.push({x: newCoords.x, y: newCoords.y});
    document.querySelector(`.board > [data-coords="${newCoords.x} ${newCoords.y}"]`).classList.add('temp');
    axis === 'x' ? newCoords.x++: newCoords.y++;
    if (newCoords.x > 9 || newCoords.y > 9) break;
  }
}

const renderGameboard = (player, playerName, board) => {
  let $board = $sampleGameBoard;
  $board.classList.add(playerName);
  board.forEach(cell => $board.appendChild(newCellDOM(cell)));
}

  const placeShip = (coords, axis) => {
    shipInfoArray.push(shipInfo(ships[current.shipNum++], coords, axis));
    current.shipCoordsArray.forEach(coords => {
      document.querySelector(`.board > [data-coords="${coords.x} ${coords.y}"]`).classList.add('ship');
    })
    if (shipInfoArray.length === ships.length) {
      $modal.remove();
      GameController.init();
    }
  }

  const getShipInfoArray = () => shipInfoArray;

  const init = () => {
    renderGameboard('sample', player.name, player.gameboard.getBoard());
    $modal.addEventListener('keyup', )
  }

  return {
    init,
    getShipInfoArray,
  }

})();

export default PlaceShips;