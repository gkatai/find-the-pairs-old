// eslint-disable-next-line no-unused-vars
import board from './board';

describe('Board', () => {
  describe('ifFlipIsValid', () => {
    test.todo('should return true if selected element is not yet flipped');
    test.todo('should return false if selected element is already flipped');
    test.todo('should return false if selected element is bigger then array size');
    test.todo('should return false if selected element is smaller than array size');
  });
  describe('flip', () => {
    test.todo('should return with an array containing the added element if flip array was empty');
    test.todo('should return with an array containing the first and the added element if array had an element');
    test.todo('should return with an array containing the the added element if array had second element');
  });
  describe('evaluate', () => {
    describe('when flip array elements are matching', () => {
      test.todo('should return with the updated blocks array and true match property');
    });
    describe('when flip array elements are not matching', () => {
      test.todo('should return with false match property');
    });
  });
  describe('flip and evaluate', () => {
    test.todo('should check if ifFlipIsValid function has been called');
    test.todo('should check if flip function has been called');
    test.todo('should check if evaluate function has been called');
  });
});
