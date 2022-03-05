/* eslint-env jest */
import Gameboard from "../Factories/Gameboard";
import Player from "../Factories/Player";

jest.mock("../Factories/Gameboard");
describe('Player functions', () => {

  it('Gameboard factory called', () => {
    // eslint-disable-next-line no-unused-vars
    let testPlayer = Player('S', 'tester');
    expect(Gameboard).toHaveBeenCalledTimes(1);
  })
})