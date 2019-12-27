export const INCREMENT = 'INCREMENT';

export function increment(count) {
  return {
    type: INCREMENT,
    count
  };
}
