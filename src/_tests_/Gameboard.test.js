/* eslint-env jest */
import Gameboard from "../Factories/Gameboard";
import Ship from "../Factories/Ship";

describe('Gameboard functions', () => {
  let testBoard;
  beforeEach(() => {
    testBoard = Gameboard(10);
  })

  it('Initialise Gameboard', () => {
    expect(testBoard.getBoard().length).toBe(100);
  })

  it('Mark board is shot', () => {
    testBoard.receiveAttack({x: 2, y: 5});
    expect(testBoard.at({x: 2, y: 5}).isShot).toBeTruthy();
  })

  it('Ship is hit', () => {
    const ship = Ship(3, 'Carrier');
    testBoard.setShip(ship, {x: 7, y: 1}, 'y');
    testBoard.receiveAttack({x: 7, y: 1});
    testBoard.receiveAttack({x: 7, y: 2});
    expect(ship.getHits()).toBe(2);
    testBoard.receiveAttack({x: 7, y: 3});
    expect(ship.isSunk()).toBeTruthy();
  })

  it('Ship placement: X-axis', () => {
    const ship = Ship(3, 'Knight');
    testBoard.setShip(ship, {x: 1, y: 1}, 'x');
    expect(testBoard.at({x: 1, y: 1}).hasShip).toBe('Knight');
    expect(testBoard.at({x: 2, y: 1}).hasShip).toBe('Knight');
    expect(testBoard.at({x: 3, y: 1}).hasShip).toBe('Knight');
  })

  it('Ship placement: Y-axis', () => {
    const ship = Ship(2, 'Gladiator');
    testBoard.setShip(ship, {x: 5, y: 3}, 'y');
    expect(testBoard.at({x: 5, y: 3}).hasShip).toBe('Gladiator');
    expect(testBoard.at({x: 5, y: 4}).hasShip).toBe('Gladiator');
  })

  it('Ship collision with edges', () => {
    const ship = Ship(3, 'Carrier');
    testBoard.setShip(ship, {x: 8, y: 1}, 'x');
    expect(testBoard.isCollisions(testBoard.getShipCoordsArray(ship))).toBe(true);
  })

  it ('Ship collision with ship', () => {
    testBoard.setShip(Ship(3, 'Carrier'), {x: 1, y: 1}, 'x');
    const ship = Ship(2, 'Sub');
    testBoard.setShip(ship, {x: 1, y: 1}, 'y');
    expect(testBoard.isCollisions(testBoard.getShipCoordsArray(ship))).toBe(true);
  })

  it ('4-way adjacenct coords excluding with edges', () => {
    const adjacentCoords = testBoard.getValidAdjacentCoords({x: 0, y: 5});
    expect(adjacentCoords)
    .toEqual(expect.arrayContaining([{x: 0, y: 4}, {x: 0, y: 6}, {x: 1, y: 5}]));
    expect(adjacentCoords.length).toBe(3);
  })


})