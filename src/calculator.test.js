import add from './calculator';

describe('Calcualtor', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
