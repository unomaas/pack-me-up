import sum from './add';

// Add two integers:
test('Add two integers', () => {
  expect(sum(1,2)).toBe(3);
})

// Add two decimals:
test('Add two decimals', () => {
  expect(sum(1.5,2.5)).toBe(4);
})

// Add negative:
test('Add two negatives', () => {
  expect(sum(-1, 3)).toBe(2)
})

// Add string:
test('Add two strings', () => {
  expect(sum('2', '3')).toBe(5)
})

// Handle one number?
// test('Handle one number', () => {
//   expect(sum(1)).toBe(1)
// })

// Handle string of 'ten'? 
test(`Handle string of 'ten'`, () => {
  expect(sum('ten', 1)).toBe(NaN);
})

