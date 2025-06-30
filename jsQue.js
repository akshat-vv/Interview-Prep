// Example 1: setTimeout with regular function vs arrow function

// Using regular function — 'this' does not refer to the person object
const person1 = {
  name: "Akshat",
  greet: function () {
    setTimeout(function () {
      console.log("Hello " + this.name); // 'this' is undefined or window/global
    }, 0);
  },
};

// Using arrow function — 'this' refers to the lexical context (person2)
const person2 = {
  name: "Akshat",
  greet: function () {
    setTimeout(() => {
      console.log("Hello " + this.name); // 'this' refers to person2
    }, 0);
  },
};

// person2.greet();


// Example 2: Flattening keys of nested object

const nestedObj = { a: { b: { c: 1 }, d: 2 }, e: 3 };

// Output: ['a.b.c', 'a.d', 'e']
function getFlattenedKeys(obj, parentKey = "", result = []) {
  for (const key in obj) {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    const value = obj[key];

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      getFlattenedKeys(value, fullKey, result);
    } else {
      result.push(fullKey);
    }
  }

  return result;
}

// console.log(getFlattenedKeys(nestedObj));


// Example 3: Flatten object to key-path:value

// Input: { a: { b: { c: 1 }, d: 2 }, e: 3 }
// Output: { 'a.b.c': 1, 'a.d': 2, 'e': 3 }
function flattenObject(obj, parentKey = "", result = {}) {
  for (const key in obj) {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    const value = obj[key];

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      flattenObject(value, fullKey, result);
    } else {
      result[fullKey] = value;
    }
  }

  return result;
}

// console.log(flattenObject(nestedObj));


// Example 4: Unflatten object

// Input: { 'a.b.c': 1, 'a.d': 2, 'e': 3 }
// Output: { a: { b: { c: 1 }, d: 2 }, e: 3 }
function unflattenObject(flatObj) {
  const result = {};

  for (const key in flatObj) {
    const parts = key.split('.');
    let current = result;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (i === parts.length - 1) {
        current[part] = flatObj[key];
      } else {
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
    }
  }

  return result;
}

// const flatObj = { 'a.b.c': 1, 'a.d': 2, 'e': 3 };
// console.log(unflattenObject(flatObj));


// Example 5: Invert a nested object to key-paths

// Input: { a: { b: { c: 'x' }, d: 'y' }, e: 'z' }
// Output: { x: 'a.b.c', y: 'a.d', z: 'e' }

const obj = { a: { b: { c: 'x' }, d: 'y' }, e: 'z' };

function invertNestedObj(obj, parentKey = '', result = {}) {
  for (const key in obj) {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    const value = obj[key];

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      invertNestedObj(value, fullKey, result);
    } else {
      result[value] = fullKey;
    }
  }

  return result;
}

// console.log(invertNestedObj(obj));

// Example 6 : Group by a key in array of objects
const data = [
  { type: 'fruit', name: 'apple' },
  { type: 'veg', name: 'carrot' },
  { type: 'fruit', name: 'banana' },
  { type: 'veg', name: 'spinach' }
];

/* Output
  fruit: [
    { type: 'fruit', name: 'apple' },
    { type: 'fruit', name: 'banana' }
  ],
  veg: [
    { type: 'veg', name: 'carrot' },
    { type: 'veg', name: 'spinach' }
  ]
} */

function groupByType(data){
    const result = {};

    data.forEach((d)=>{
        if(!result[d.type]){
            result[d.type] = [];
        }
        result[d.type].push(d);
    })

    console.log(result);
}

// groupByType(data);

// Example - 7 - Convert array of key-value pairs to object

const arr = [['a', 1], ['b', 2]];
//output = {a:1, b:2};

function convertToObj(arr){
    const obj = {};

    arr.forEach(([key,value])=>{
        obj[key] = value;
    })

    return obj;
}

console.log(convertToObj(arr));


// Example 8 - Custom Stringify

// const obj = {
//   name: "akshat",
//   age: 25,
//   active: true,
//   nested: {
//     skills: ['js', 'react'],
//     empty: null
//   }
// };

// Output - {"name":"akshat","age":25,"active":true,"nested":{"skills":["js","react"],"empty":null}}


function customStringify(value) {
  if (value === null) return 'null';

  const type = typeof value;

  if (type === 'number' || type === 'boolean') {
    return String(value);
  }

  if (type === 'string') {
    return `"${value}"`; // quote the string
  }

  if (Array.isArray(value)) {
    const elements = value.map(item => customStringify(item) ?? 'null');
    return `[${elements.join(',')}]`;
  }

  if (type === 'object') {
    const entries = Object.entries(value).map(([key, val]) => {
      const v = customStringify(val);
      if (v === undefined) return undefined;
      return `"${key}":${v}`;
    }).filter(Boolean);
    return `{${entries.join(',')}}`;
  }

  // Skip unsupported types (e.g., function, undefined, symbol)
  return undefined;
}


// Example 9 - Simulate an in-memory DB with PUT, GET, DELETE operations

function createInMemoryDB() {
  const store = {}; // this is our in-memory database

  return {
    put(key, value) {
      store[key] = value;
      console.log(`PUT: ${key} = ${JSON.stringify(value)}`);
    },

    get(key) {
      if (key in store) {
        console.log(`GET: ${key} => ${JSON.stringify(store[key])}`);
        return store[key];
      } else {
        console.log(`GET: ${key} not found`);
        return null;
      }
    },

    delete(key) {
      if (key in store) {
        delete store[key];
        console.log(`DELETE: ${key} removed`);
        return true;
      } else {
        console.log(`DELETE: ${key} not found`);
        return false;
      }
    },

    print() {
      console.log('Current DB State:', JSON.stringify(store, null, 2));
    }
  };
}


// const db = createInMemoryDB();

// db.put("name", "Akshat");
// db.put("age", 25);

// db.get("name");     // Output: Akshat
// db.get("city");     // Output: not found

// db.delete("age");   // age removed
// db.delete("city");  // city not found

// db.print();
// // Output:
// // {
// //   "name": "Akshat"
// // }


// Example - 10 - 

const operations = [
  ["PUT", "www.apple.com", "10.20.30.40"],
  ["PUT", "jobs.apple.com", "10.20.30.50"],
  ["PUT", "sites.google.com", "142.258.145.693"],
  ["GET", "sample.com"],
  ["GET", "www.apple.com"],
  ["COUNT", "apple.com"],
  ["COUNT", "com"]
];

// output = ["null", "10.20.30.40", "2", "3"]

function processDomainOperations(operations) {
  const result = [];
  const memory = {};

  function put(domain, ip) {
    memory[domain] = ip; // Allow overwrite
  }

  function get(domain) {
    if (memory.hasOwnProperty(domain)) {
      result.push(memory[domain]);
    } else {
      result.push("null"); // must be a string!
    }
  }

  function count(domain) {
    let count = 0;
    for (const key in memory) {
      if (key.endsWith(domain)) {
        count++;
      }
    }
    result.push(count.toString()); // must return string count
  }

  for (const op of operations) {
    const [action, domain, ip] = op;

    // Validate inputs (all strings)
    if (!op.every(item => typeof item === 'string')) continue;

    switch (action) {
      case "PUT":
        if (domain && ip) put(domain, ip);
        break;
      case "GET":
        if (domain) get(domain);
        break;
      case "COUNT":
        if (domain) count(domain);
        break;
    }
  }

  return result;
}


console.log(processDomainOperations(operations));