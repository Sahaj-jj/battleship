const Ship = (length, name) => {
  const shipLength = length;
  let hitCount = 0;

  // Getters
  const getLength = () => shipLength;
  const getHits = () => hitCount;

  const hit = () => {
    hitCount++;
  }

  const isSunk = () => {
    return hitCount >= shipLength;
  }

  return {
    name,
    getLength,
    getHits,
    hit,
    isSunk,
  };
}

export default Ship;