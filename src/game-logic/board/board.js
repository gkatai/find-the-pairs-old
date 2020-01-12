const board = {
  ifFlipIsValid,
  flip,
  evaluate,
  unlock,
  flipAndEvaluate,
  states: {
    inactive: 'INACTIVE',
    loading: 'LOADING',
    loaded: 'LOADED',
    loadError: 'LOAD_ERROR',
    victory: 'VICTORY'
  }
};

export default board;

function ifFlipIsValid(index, blocks) {
  if (blocks.length === 0 || index < 0 || index >= blocks.length || blocks[index].flipped) {
    return false;
  }

  return true;
}

function flip(index, flippedElements) {
  let result;

  if (flippedElements.includes(index)) {
    return flippedElements;
  }

  if (flippedElements.length === 2) {
    result = [];
  } else {
    result = [...flippedElements];
  }

  result.push(index);

  return result;
}

function evaluate(flippedElements, blocks) {
  if (flippedElements.length === 2 && blocks[flippedElements[0]].value === blocks[flippedElements[1]].value) {
    const updatedBlocks = [...blocks];
    updatedBlocks[flippedElements[0]].found = true;
    updatedBlocks[flippedElements[1]].found = true;
    return { updatedBlocks, isMatch: true };
  }

  return { isMatch: false };
}

function unlock(state) {
  return { ...state, board: { ...state.board, isLocked: false } };
}

function flipAndEvaluate(state) {
  if (board.ifFlipIsValid(state.selectedIndex, state.board.blocks)) {
    const flippedElements = board.flip(state.selectedIndex, state.flippedElements);
    const evaluationResult = board.evaluate(flippedElements, state.board.blocks);

    if (evaluationResult.isMatch) {
      const isEverythingFound = !evaluationResult.updatedBlocks.some(block => block.found === false);

      let boardState;

      if (isEverythingFound) {
        boardState = board.states.victory;
      } else {
        boardState = state.state;
      }

      return {
        ...state,
        state: boardState,
        flippedElements,
        selectedIndex: undefined,
        board: { ...state.board, isLocked: true, blocks: evaluationResult.updatedBlocks }
      };
    } else {
      return {
        ...state,
        flippedElements: board.flip(state.selectedIndex, state.flippedElements),
        selectedIndex: undefined
      };
    }
  }

  return { ...state, selectedIndex: undefined };
}
