const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply =  (a, b) => a * b;
const devide = (a, b) => a / b;
// exports.devide = (a, b) => a / b;

const milesToKilometers = (miles) => miles * 1.60934;
// exports.milesToKilometers = (miles) => miles * 1.60934;
const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

module.exports = { add, subtract, multiply, devide, milesToKilometers, celsiusToFahrenheit }