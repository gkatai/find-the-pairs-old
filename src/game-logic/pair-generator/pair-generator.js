const generator = {
  get,
  getPairs
};

export default generator;

function get(algorithm, pool) {
  const index = algorithm(pool);
  const newPool = [...pool];
  const selectedNumber = newPool.splice(index, 1)[0];

  return {
    newPool,
    selectedNumber
  };
}

function getPairs(algorithm, initialPool) {
  let newPool = [...initialPool, ...initialPool];
  const result = [];

  while (newPool.length > 0) {
    const generationResult = get(algorithm, newPool);
    result.push(generationResult.selectedNumber);
    newPool = generationResult.newPool;
  }

  return result;
}
