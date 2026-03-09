nums = [12, 10, 8, 3];

console.log(nums.sort(compareFn));

function compareFn(a,b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
 return 0;
}


const simpleList = ["oranges", "grapes", "lemons", "apples", "Bananas", "watermelons", "coconuts", "broccoli", "mango"];

let simpleSort = simpleList.sort();
console.log(simpleSort);

// FIX 1: lowerList was never defined — map simpleList to lowercase
let lowerList = simpleList.map(item => item.toLowerCase());

let lowerSort = lowerList.sort();
// FIX 2: console.log=lowerSort → console.log(lowerSort)
console.log(lowerSort);

let searchTerm = 'an';

let filterFruit = lowerSort.filter(searchFruit);

function searchFruit(item) {
    // FIX 3: item.uncludees → item.includes
    return item.includes(searchTerm);
}

// FIX 4: filterfruit → filterFruit (wrong case)
console.log(filterFruit);


// FIX 5: Renamed to compareProductFn to avoid duplicate declaration
function compareProductFn(a,b) {
  if (a.price < b.price) {
    return -1;
  } else if (a.price > b.price) {
    return 1;
  }
 return 0;
}


const products = [
  {
    productName: "Wireless Mouse",
    price: 29.99
  },
  {
    productName: "Bluetooth Keyboard",
    price: 49.99
  },
  {
    productName: "Laptop Stand",
    price: 39.99
  }
];

// FIX 5 (cont): updated to use compareProductFn
let productSort = products.sort(compareProductFn);

console.log(productSort);


const animals = [
  {
    name: "Lion",
    traits: ["brave", "strong", "fierce", "wild"]
  },
  {
    name: "Elephant",
    traits: ["large", "gentle", "smart", "wild"]
  },
  {
    name: "Fox",
    traits: ["sly", "quick", "clever", "wild"]
  },
  {
    name: "Dog",
    traits: ["loyal", "friendly", "playful", "cuddly"]
  },
  {
    name: "Cat",
    traits: ["quiet", "independent", "curious", "cuddly"]
  }
];

let query = 'dog';

// FIX 6: letfilteredList → let filteredList (missing space)
let filteredList = animals.filter(searchList);

function searchList(item){
    return item.name.toLowerCase().includes(query.toLowerCase());
}

console.log(filteredList);

let queryTrait = 'cuddly';

// FIX 7: letfilteredTraits → let filteredTraits (missing space)
let filteredTraits = animals.filter(searchTrait);

function searchTrait(item){
    return item.traits.some(trait => trait.toLowerCase().includes(queryTrait.toLowerCase()));
}

console.log(filteredTraits);