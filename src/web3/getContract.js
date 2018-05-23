import TruffleContract from 'truffle-contract'


function fixTruffleContract(contract) {
  if (typeof contract.currentProvider.sendAsync !== "function") {
      contract.currentProvider.sendAsync = function() {
          return contract.currentProvider.send.apply(
              contract.currentProvider, arguments
          );
      };
  }
  return contract;
}

async function getContractInstance(abi, provider) {
  let contract = TruffleContract(abi)
  contract.setProvider(provider)
  contract = fixTruffleContract(contract)
  return await contract.deployed()
}

export default getContractInstance
