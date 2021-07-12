import fizzbuzz from './fizzbuzz';

describe('Test fizzbuzz code', () => {
  
  test('should return "FizzBuzz" if divisible by both 3 & 5', () => {
    expect(fizzbuzz(15)).toBe("FizzBuzz");
  })
  
  test('should return "Buzz" if divisible by 5', () => {
    expect(fizzbuzz(10)).toBe("Buzz");
  })

  test('should return "Fizz" if divisible by 3', () => {
    expect(fizzbuzz(9)).toBe("Fizz");
  })

})