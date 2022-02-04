/* eslint-env jest */
import Gameboard from "../Factories/Gameboard";

describe('Gameboard functions', () => {
  let testBoard;
  beforeEach(() => {
    testBoard = Gameboard(10);
  })

  it('Mark board is shot', () => {
    testBoard.receiveAttack(2, 5);
    expect(testBoard.at(2, 5)).toEqual({x: 2, y: 5, hasShip: false, isShot: true});
  })
})