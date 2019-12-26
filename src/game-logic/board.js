import produce from 'immer';

const board = {
  ifFlipIsValid,
  flip,
  evaluate,
  flipAndEvaluate
};

export default board;

function ifFlipIsValid(index, blocks) {
  if (index > blocks.length - 1 || index < 0 || blocks[index] === 0) {
    return false;
  }

  return true;
}

function flip(index, flippedElements) {
  let result;

  if (flippedElements.length === 2) {
    result = [];
  } else {
    result = [...flippedElements];
  }

  result.push(index);

  return result;
}

function evaluate(flippedElements, blocks) {
  if (flippedElements.length === 2 && blocks[flippedElements[0]] === blocks[flippedElements[1]]) {
    const updatedBlocks = [...blocks];
    updatedBlocks[flippedElements[0]] = 0;
    updatedBlocks[flippedElements[1]] = 0;
    return { updatedBlocks, isMatch: true };
  }

  return { isMatch: false };
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
    draftState.invalidMessage = true;
    draftState.selectedIndex = undefined;
  });
}
