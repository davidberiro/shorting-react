# README

This is an attempt to implement contracts that will allow users to short ERC20 compliant tokens on the blockchain in a decentralized manner. The order book used to match lenders and shorters will be implemented in a way similar to airdrop, and the logic used for the shorting will be similar to what is found in the whitepaper published by dy dx

## Structure

`src` folder contains the frontend written in react
`contracts` folder contains all the smart contracts written in solidity
`test` folder contains the tests written in js with the truffle/mocha test framework
`server` folder contains the backend written with express

## Getting Started

First install all the dependencies:

```sh
yarn install
```

Start truffle:

```sh
truffle develop
```

Then set metamask custom RPC to http://localhost:9545, and import any account from the truffle console.
In the truffle console, run
```sh
migrate --reset
```
in order to migrate the contracts to the local blockchain instance.

Start the front end:

In a new console, run

```sh
yarn start
```

Start the back end:

In a new console, run

```sh
cd server && yarn start
```

Run tests:

In the truffle console, run

```sh
test
```