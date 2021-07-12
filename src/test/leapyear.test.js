import leapyear from './leapyear';

// Write a function that takes in a year and returns a boolean indicating if the year is a leap year. 
// Years that are divisible by 4 are leap years, 
// but years that are divisible by 100 are not leap years, 
// but years that are divisible by 400 are leap years.

describe('Test leapyear code', () => {

  test('should return true if divisible by 400', () => {
    expect(leapyear(2000)).toBe(true);
  })

  test('should return false if divisible by 100', () => {
    expect(leapyear(1900)).toBe(false);
  })

  test('should return true if divisible by 4', () => {
    expect(leapyear(2004)).toBe(true);
  })
  
})