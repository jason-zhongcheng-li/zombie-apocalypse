# Ailo coding exercise - Zombie Apocalypse v4.5

This is the world with zombie and creatures after nuclear war. A zombie wakes and moves based on the directions. It bits any number of the creatures on the same square (x, y), spreads zombieness so all of the creatures will be transformed to be zombies. These new zombies will be walking one by one until last zombie has performed all its moves.

## Author
Jason Li [LinkedIn](https://www.linkedin.com/in/jason-li-5a943a135/)

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the depencencies.

```bash
npm i
```

## Unit Tests
The unit tests of controller and service classes are all based on [Mocha](https://mochajs.org/) JavaScript test framework. The mocha dependency is installed once you have done the installation above.

### *How to run unit test*
Execute following cli to run all unit tests
```bash
npm test
```

### *What does `npm test` do*
* Compile source code to javascript files
* Check rules configured in tslint
* Execute mocha unit tests

## Result
To see the expected result in the terminal, uncomment the code on line 105 in **WorldController.test.ts** file.

## License
[MIT](https://choosealicense.com/licenses/mit/)
