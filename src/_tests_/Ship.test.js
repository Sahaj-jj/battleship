/* eslint-env jest */
import Ship from "../Factories/Ship";

describe('Ship functions', () => {

  let testShip;
  beforeEach(() => {
    testShip = Ship(5, 'tester');
  })

  it('Ship hit once', () => {
    testShip.hit();
    expect(testShip.getHits()).toBe(1);
  })

  it('Ship sunk', () => {
    for (let i = 0; i < testShip.getLength(); i++) {
      testShip.hit();
    }
    expect(testShip.isSunk()).toBe(true);
  })
})