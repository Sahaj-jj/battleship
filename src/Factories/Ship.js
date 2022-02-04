const Ship = (length) => {
  const shipLength = length;
  const hitsArray = new Array(length).fill(false);

  // Getters
  const getLength = () => shipLength;
  const getHits = () => hitsArray;

  const hit = (pos) => {
    hitsArray[pos] = true;
  }

  const isSunk = () => {
    for (const isHit of hitsArray) {
      if (!isHit) return false;
    }
    return true;
  }

  return {
    getLength,
    getHits,
    hit,
    isSunk,
  };
}

export default Ship;