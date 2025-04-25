const fs = require('fs');

const example = require('./src/example');
const solution = require(`./src/solution`);

const { changeConfig, configValue } = require('./src/configs')

const newFns = solution(configValue);

const result = example(newFns, changeConfig);

fs.writeFileSync('./output.json', JSON.stringify(result, null, 2));
