class Node {
  constructor(value) {
    this.value = value || null;
    this.ref = [];
  }

  insert(index, value) {
    this.ref[index] = value;
  }

  createRef(index) {
    this.ref[index] = new Node();
    return this.ref[index];
  }
}

class Trie {
  constructor() {
    this.root = new Node("");
    this.alphabet = 26;
  }

  insert(key, value) {
    key = key.toLowerCase();

    let node = this.root;
    for (let i = 0; i < key.length; i++) {
      node = this.searchRef(node, key[i]);
    }

    node.value = value;
  }

  searchRef(node, char) {
    const index = char.charCodeAt() - 97;
    if (typeof node.ref[index] == "undefined") {
      return node.createRef(index);
    }

    return node.ref[index];
  }

  retrieve(key) {
    key = key.toLowerCase();
    let node = this.root;

    for (let i = 0; i < key.length; i++) {
      node = this.searchHit(node, key[i]);
      if (node == null) {
        return null;
      }
    }

    return node.value;
  }

  delete(key) {
    key = key.toLowerCase();
    let node = this.root;

    for (let i = 0; i < key.length; i++) {
      node = this.searchHit(node, key[i]);
      if (node == null) {
        return null;
      }
    }

    node.value = null;
  }

  searchHit(node, char) {
    const index = char.charCodeAt() - 97; // 96, but because index start from 0 => subtract with 97
    if (typeof node.ref[index] != "undefined") {
      return node.ref[index];
    } else {
      return null;
    }
  }

  getSuggestions(key) {
    key = key.toLowerCase();
    let node = this.root;

    for (let i = 0; i < key.length; i++) {
      node = this.searchHit(node, key[i]);
      if (node == null) {
        return null;
      }
    }

    return this.searching(node).map(v => `${key}${v}`);
  }

  searching(node) {
    let words = [];
    for (let i = 0; i < this.alphabet; i++) { // 26 total alphabet
      if (typeof node.ref[i] != "undefined") {  // go to every existed node, from the lowest
        const res = this.searching(node.ref[i]);  
        if (res.length > 0) { 
          const all = res.map(v => String.fromCharCode(i + 97).concat(v));
          words = [...words, ...all]
        } else {  // leaf node
          words.push(String.fromCharCode(i + 97));
        }
      }
    }

    return words;
  }
}

module.exports = Trie;