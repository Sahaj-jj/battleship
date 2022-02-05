/* eslint-env jest */
import Gameboard from "../Factories/Gameboard";
import Ship from "../Factories/Ship";

describe('Gameboard functions', () => {
  let testBoard;
  beforeEach(() => {
    testBoard = Gameboard(10);
  })

  it('Mark board is shot', () => {
    testBoard.receiveAttack({x: 2, y: 5});
    expect(testBoard.at({x: 2, y: 5}).isShot).toBeTruthy();
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
})