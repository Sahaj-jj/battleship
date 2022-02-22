import GameController from "./GameController";
import PlaceShips from "./PlaceShips";

const UI = (() => {
  const $main = document.querySelector('.main');
  const $modal = document.querySelector('.modal');
  let mode = 'PLAY';

  const decodeCoords = (coordsString) => {
    const coordsArray = coordsString.split(' ');
    return {x: +coordsArray[0], y: +coordsArray[1]};
  }
  
  const newCellDOM = (cell) => {
      const $cell = document.createElement('div');
      $cell.classList.add('cell');
      $cell.setAttribute('data-coords', `${cell.coords.x} ${cell.coords.y}`);
      if (cell.hasShip) $cell.classList.add('ship');
      addCellListener($cell);
      return $cell;
  }

  const addCellListener = ($cell) => {
    if (mode === 'PLACE') {
      $cell.addEventListener('click', () => {
        PlaceShips.placeShip(decodeCoords($cell.getAttribute('data-coords')));
      });
  
      $cell.addEventListener('mouseover', () => {
        PlaceShips.showShip(decodeCoords($cell.getAttribute('data-coords')));
      });
    }
    else $cell.addEventListener('click', () => {
      GameController.playTurn(decodeCoords($cell.getAttribute('data-coords')));
    });
  }

  const cellHit = (coords) => {
    const encodedCoords = `${coords.x} ${coords.y}`;
    const $cell = document.querySelector(`.active > [data-coords="${encodedCoords}"]`);
    $cell.classList.add('hit');
  }

  const toggleActiveBoard = () => {
    const $gameboardContainers = Array.from($main.children);
    $gameboardContainers.forEach($gameboard => {
      $gameboard.firstChild.classList.toggle('active');
    });
  }

  const shipSunk = (coordsArray) => {
    coordsArray.forEach(coords => {
      document.querySelector(`.active > [data-coords="${coords.x} ${coords.y}"]`).classList.add('sunk');
    })
  }

  const newGameboardContainerDOM = (playerName) => {
    const $container = document.createElement('div');
    $container.classList.add('container');
    const $board = document.createElement('div');
    $board.classList.add(`${playerName}`);
    $board.classList.add('board');
    const $shipsDisplay = document.createElement('div');
    $shipsDisplay.classList.add('ships-display');
    $container.appendChild($board);
    $container.appendChild($shipsDisplay);
    if (mode === 'PLACE') $modal.appendChild($container);
    else $main.appendChild($container);
    return $container;
  }

  const renderGameboard = (player, playerName, board, isActive = false) => {
    mode = playerName === 'sample' ? 'PLACE': 'PLAY';
    const $container = newGameboardContainerDOM(playerName);
    if (isActive) $container.firstChild.classList.add('active');
    board.forEach(cell => $container.firstChild.appendChild(newCellDOM(cell)));
  }

  const newShipDOM = (ship, isPlaced = false) => {
    const $ship = document.createElement('div');
    $ship.textContent = ship.name;
    if (ship.isSunk() || (mode === 'PLACE' && isPlaced)) $ship.classList.add('sunk');
    return $ship;
  }

  const updateShipsDisplay = (playerName, ships, shipNum = -1) => {
    const $shipsDisplay = document.querySelector(`.${playerName}`).nextElementSibling;
    $shipsDisplay.textContent = '';
    ships.forEach((ship, index) => {
      $shipsDisplay.appendChild(newShipDOM(ship, index <= shipNum));
    });
  }

  return {
    renderGameboard,
    updateShipsDisplay,
    cellHit,
    shipSunk,
    toggleActiveBoard,
  };

})();

export default UI;