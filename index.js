const fs = require('fs');
const path = require('path');
const Trie = require('./trie');

const trie = new Trie();

const words = fs.readFileSync(path.join(__dirname, './dict.txt'), 'utf8');
words.split('\n')
  .forEach(word => trie.insert(word, 1));

const args = process.argv.slice(2);
if (!args[0]) {
  throw "Please input your words";
} 

const result = trie.getSuggestions(args[0]);
console.log(result);