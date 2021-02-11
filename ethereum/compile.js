const path = require('path')
const solc = require('solc')
const fs = require('fs-extra')

const buildPath = path.resolve(__dirname, 'build')

// Delete the entire build folder
fs.removeSync(buildPath)

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol')

// Read Campaign.sol form the contracts folder
const source = fs.readFileSync(campaignPath, 'utf8')

// Compile both contracts with solidity compiler
const output = solc.compile(source, 1).contracts

// Create build folder
fs.ensureDirSync(buildPath)

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}