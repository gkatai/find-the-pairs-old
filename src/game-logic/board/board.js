import produce from 'immer';

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
    loadError: 'LOAD_ERROR'
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
    return produce({ updatedBlocks: blocks, isMatch: true }, draftState => {
      draftState.updatedBlocks[flippedElements[0]].found = true;
      draftState.updatedBlocks[flippedElements[1]].found = true;
    });
  }

  return { isMatch: false };
}

function unlock(state) {
  return produce(state, draftState => {
    draftState.board.isLocked = false;
  });
}

function flipAndEvaluate(state) {
  if (board.ifFlipIsValid(state.selectedIndex, state.board.blocks)) {
    const flippedElements = board.flip(state.selectedIndex, state.flippedElements);
    const evaluationResult = board.evaluate(flippedElements, state.board.blocks);

    if (evaluationResult.isMatch) {
      return produce(state, draftState => {
        draftState.flippedElements = flippedElements;
        draftState.selectedIndex = undefined;
        draftState.board.isLocked = true;
        draftState.board.blocks = evaluationResult.updatedBlocks;
      });
    } else {
      return produce(state, draftState => {
        draftState.flippedElements = board.flip(state.selectedIndex, state.flippedElements);
        draftState.selectedIndex = undefined;
      });
    }
  }

  return produce(state, draftState => {
    draftState.selectedIndex = undefined;
  });
}
