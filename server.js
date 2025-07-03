// console.log('Hello people!')
// console.log(global)

// const os = require('os')
// const path = require('path')

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())

// console.log(__dirname)
// console.log(__filename)

// console.log(path.dirname(__filename))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))

// console.log(path.parse(__filename))

const formula = require('./formula')
const { devide, milesToKilometers } = require('./formula')

console.log(formula.celsiusToFahrenheit(21))
console.log(formula.subtract(10, 7))
console.log(formula.multiply(8, 9))
console.log(devide(25, 5))
console.log(milesToKilometers(10))

