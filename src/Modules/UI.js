import GameController from "./GameController";
import PlaceShips from "./PlaceShips";

const UI = (() => {
  const $main = document.querySelector('.main');
  const $modal = document.querySelector('.modal');
  const $winModal = document.querySelector('.modal-win');
  let mode = 'PLAY';

  const decodeCoords = (coordsString) => {
    const coordsArray = coordsString.split(' ');
    return {x: +coordsArray[0], y: +coordsArray[1]};
  }

  const createHtmlElement = (type, classArray = null, text = null) => {
    const element = document.createElement(type);
    if (classArray) classArray.forEach(cls => element.classList.add(cls));
    if (text) element.textContent = text;
    return element;
  }
  
  const newCellDOM = (cell) => {
      const $cell = createHtmlElement('div', ['cell']);
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
    const $container = createHtmlElement('div', ['container']);
    $container.appendChild(createHtmlElement('div', [`${playerName}`, 'board']));
    $container.appendChild(createHtmlElement('div', ['ships-display']));
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
    const $shipContainer = createHtmlElement('div', ['ship-container']);
    if (ship.isSunk() || (mode === 'PLACE' && isPlaced)) $shipContainer.classList.add('sunk');
    $shipContainer.appendChild(createHtmlElement('div', ['ship-name'], ship.name));
    const $shipBody = createHtmlElement('div', ['ship-body']);
    for (let i = 0; i < ship.getLength(); i++) {
      $shipBody.appendChild(createHtmlElement('div', ['ship-cell']));
    }
    $shipContainer.appendChild($shipBody);
    return $shipContainer;
  }

  const updateShipsDisplay = (playerName, ships, shipNum = -1) => {
    const $shipsDisplay = document.querySelector(`.${playerName}`).nextElementSibling;
    $shipsDisplay.textContent = '';
    ships.forEach((ship, index) => {
      $shipsDisplay.appendChild(newShipDOM(ship, index <= shipNum));
    });
  }

  const showWinner = (playerDisplayName) => {
    $winModal.textContent = `${playerDisplayName} wins`;
    $winModal.classList.add('visible');
  }

  return {
    renderGameboard,
    updateShipsDisplay,
    cellHit,
    shipSunk,
    toggleActiveBoard,
    showWinner,
  };

})();

export default UI;