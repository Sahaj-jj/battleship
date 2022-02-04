/* eslint-env jest */
import Ship from "../Factories/Ship";

describe('Ship functions', () => {

  let testShip;
  beforeEach(() => {
    testShip = Ship(5);
  })

  it('Ship hit position', () => {
    testShip.hit(2);
    expect(testShip.getHits()[2]).toBe(true);
  })

  it('Ship sunk', () => {
    for (let i = 0; i < testShip.getLength(); i++) {
      testShip.hit(i);
    }
    expect(testShip.isSunk()).toBe(true);
  })

})