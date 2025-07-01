/**
 * JAVASCRIPT INTERVIEW QUESTIONS - COMPREHENSIVE COLLECTION
 * 
 * This file contains common JavaScript interview questions with detailed explanations
 * covering concepts like 'this' binding, object manipulation, data structures,
 * and practical programming challenges.
 * 
 * Topics Covered:
 * 1. 'this' context and arrow functions
 * 2. Object flattening and manipulation
 * 3. Data transformation and grouping
 * 4. Custom implementations (stringify, in-memory DB)
 * 5. Algorithm challenges (domain operations)
 */

/**
 * EXAMPLE 1: ARROW FUNCTIONS VS REGULAR FUNCTIONS - 'THIS' BINDING
 * 
 * Key Concept: Arrow functions don't have their own 'this' context.
 * They inherit 'this' from the enclosing lexical scope.
 * 
 * Interview Question: "Explain the difference between arrow functions and regular functions
 * in terms of 'this' binding, especially in setTimeout callbacks."
 */

/**
 * CASE 1: Regular function in setTimeout
 * 
 * Problem: Regular functions create their own execution context.
 * In setTimeout, 'this' refers to the global object (window in browser, global in Node.js)
 * or undefined in strict mode.
 */
const person1 = {
    name: "Akshat",
    greet: function () {
        setTimeout(function () {
            // 'this' here refers to global object, not person1
            // this.name is undefined because global object doesn't have 'name' property
            console.log("Hello " + this.name); // Output: "Hello undefined"
        }, 0);
    },
};

/**
 * CASE 2: Arrow function in setTimeout
 * 
 * Solution: Arrow functions inherit 'this' from their lexical scope.
 * The arrow function inherits 'this' from the greet method, which refers to person2.
 */
const person2 = {
    name: "Akshat",
    greet: function () {
        setTimeout(() => {
            // Arrow function inherits 'this' from greet method
            // 'this' refers to person2 object
            console.log("Hello " + this.name); // Output: "Hello Akshat"
        }, 0);
    },
};

// Uncomment to test:
// person1.greet(); // "Hello undefined"
// person2.greet(); // "Hello Akshat"

/**
 * ALTERNATIVE SOLUTIONS for person1:
 * 
 * 1. Store 'this' in a variable:
 * const self = this;
 * setTimeout(function() { console.log("Hello " + self.name); }, 0);
 * 
 * 2. Use bind():
 * setTimeout(function() { console.log("Hello " + this.name); }.bind(this), 0);
 * 
 * 3. Use call() or apply():
 * const fn = function() { console.log("Hello " + this.name); };
 * setTimeout(() => fn.call(this), 0);
 */

/**
 * EXAMPLE 2: FLATTENING NESTED OBJECT KEYS
 * 
 * Interview Question: "Given a nested object, return an array of all possible key paths."
 * 
 * Input:  { a: { b: { c: 1 }, d: 2 }, e: 3 }
 * Output: ['a.b.c', 'a.d', 'e']
 * 
 * This tests understanding of:
 * - Recursion
 * - Object traversal
 * - String manipulation
 * - Type checking
 */
const nestedObj = { a: { b: { c: 1 }, d: 2 }, e: 3 };

/**
 * RECURSIVE SOLUTION: Get flattened keys
 * 
 * @param {Object} obj - Object to flatten
 * @param {string} parentKey - Current key path
 * @param {Array} result - Accumulator array for results
 * @returns {Array} - Array of dot-notation key paths
 * 
 * Algorithm:
 * 1. Iterate through each key-value pair in object
 * 2. Build full key path by combining parent key with current key
 * 3. If value is object, recursively process it
 * 4. If value is primitive, add key path to result
 */
function getFlattenedKeys(obj, parentKey = "", result = []) {
    for (const key in obj) {
        // Build the full key path (e.g., "a.b.c")
        const fullKey = parentKey ? `${parentKey}.${key}` : key;
        const value = obj[key];

        // Check if value is a nested object (not null, not array)
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Recursively process nested object
            getFlattenedKeys(value, fullKey, result);
        } else {
            // Leaf node - add key path to result
            result.push(fullKey);
        }
    }
    return result;
}

// Test: console.log(getFlattenedKeys(nestedObj)); // ['a.b.c', 'a.d', 'e']

/**
 * EXAMPLE 3: FLATTEN OBJECT TO KEY-VALUE PAIRS
 * 
 * Interview Question: "Convert nested object to flat object with dot-notation keys."
 * 
 * Input:  { a: { b: { c: 1 }, d: 2 }, e: 3 }
 * Output: { 'a.b.c': 1, 'a.d': 2, 'e': 3 }
 * 
 * Use Cases:
 * - Configuration management
 * - Database document flattening
 * - Form data processing
 * - API response transformation
 */
function flattenObject(obj, parentKey = "", result = {}) {
    for (const key in obj) {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;
        const value = obj[key];

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Recursively flatten nested object
            flattenObject(value, fullKey, result);
        } else {
            // Store primitive value with flattened key
            result[fullKey] = value;
        }
    }
    return result;
}

// Test: console.log(flattenObject(nestedObj)); // { 'a.b.c': 1, 'a.d': 2, 'e': 3 }

/**
 * EXAMPLE 4: UNFLATTEN OBJECT (REVERSE OPERATION)
 * 
 * Interview Question: "Convert flat object with dot-notation keys back to nested object."
 * 
 * Input:  { 'a.b.c': 1, 'a.d': 2, 'e': 3 }
 * Output: { a: { b: { c: 1 }, d: 2 }, e: 3 }
 * 
 * Algorithm:
 * 1. Split each key by dots to get path segments
 * 2. Navigate/create nested structure following the path
 * 3. Set value at the final path segment
 */
function unflattenObject(flatObj) {
    const result = {};

    for (const key in flatObj) {
        const parts = key.split('.'); // Split "a.b.c" into ["a", "b", "c"]
        let current = result;

        // Navigate/create path up to the last segment
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            if (i === parts.length - 1) {
                // Last segment - set the value
                current[part] = flatObj[key];
            } else {
                // Intermediate segment - ensure object exists
                if (!current[part]) {
                    current[part] = {};
                }
                current = current[part]; // Move deeper into structure
            }
        }
    }

    return result;
}

// Test:
// const flatObj = { 'a.b.c': 1, 'a.d': 2, 'e': 3 };
// console.log(unflattenObject(flatObj)); // { a: { b: { c: 1 }, d: 2 }, e: 3 }

/**
 * EXAMPLE 5: INVERT NESTED OBJECT
 * 
 * Interview Question: "Swap keys and values in nested object, using dot-notation for nested keys."
 * 
 * Input:  { a: { b: { c: 'x' }, d: 'y' }, e: 'z' }
 * Output: { x: 'a.b.c', y: 'a.d', z: 'e' }
 * 
 * Use Cases:
 * - Creating reverse lookup tables
 * - Index generation
 * - Data structure transformation
 */
const objToInvert = { a: { b: { c: 'x' }, d: 'y' }, e: 'z' };

function invertNestedObj(obj, parentKey = '', result = {}) {
    for (const key in obj) {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;
        const value = obj[key];

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Recursively process nested object
            invertNestedObj(value, fullKey, result);
        } else {
            // Swap: use value as key, full path as value
            result[value] = fullKey;
        }
    }

    return result;
}

// Test: console.log(invertNestedObj(objToInvert)); // { x: 'a.b.c', y: 'a.d', z: 'e' }

/**
 * EXAMPLE 6: GROUP ARRAY OF OBJECTS BY PROPERTY
 * 
 * Interview Question: "Group array of objects by a specific property value."
 * 
 * Input:  [{ type: 'fruit', name: 'apple' }, { type: 'veg', name: 'carrot' }, ...]
 * Output: { fruit: [...], veg: [...] }
 * 
 * Common in:
 * - Data analysis and reporting
 * - UI component organization
 * - Database query result processing
 */
const data = [
    { type: 'fruit', name: 'apple' },
    { type: 'veg', name: 'carrot' },
    { type: 'fruit', name: 'banana' },
    { type: 'veg', name: 'spinach' }
];

/**
 * GROUP BY IMPLEMENTATION
 * 
 * @param {Array} data - Array of objects to group
 * @param {string} groupKey - Property name to group by
 * @returns {Object} - Object with grouped arrays
 */
function groupBy(data, groupKey) {
    const result = {};

    data.forEach((item) => {
        const groupValue = item[groupKey];
        
        // Initialize array if group doesn't exist
        if (!result[groupValue]) {
            result[groupValue] = [];
        }
        
        // Add item to appropriate group
        result[groupValue].push(item);
    });

    return result;
}

// Specific implementation for the example
function groupByType(data) {
    return groupBy(data, 'type');
}

// Test: console.log(groupByType(data));

/**
 * EXAMPLE 7: CONVERT ARRAY OF KEY-VALUE PAIRS TO OBJECT
 * 
 * Interview Question: "Convert array of [key, value] pairs to object."
 * 
 * Input:  [['a', 1], ['b', 2]]
 * Output: { a: 1, b: 2 }
 * 
 * This is similar to Object.fromEntries() but implemented manually.
 */
const keyValuePairs = [['a', 1], ['b', 2]];

/**
 * MANUAL IMPLEMENTATION
 * 
 * @param {Array} arr - Array of [key, value] pairs
 * @returns {Object} - Constructed object
 */
function convertToObj(arr) {
    const obj = {};

    arr.forEach(([key, value]) => {
        obj[key] = value;
    });

    return obj;
}

// Alternative using reduce:
function convertToObjReduce(arr) {
    return arr.reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
}

console.log(convertToObj(keyValuePairs)); // { a: 1, b: 2 }

/**
 * EXAMPLE 8: CUSTOM JSON.STRINGIFY IMPLEMENTATION
 * 
 * Interview Question: "Implement a basic version of JSON.stringify()."
 * 
 * Requirements:
 * - Handle primitives (string, number, boolean, null)
 * - Handle arrays and objects
 * - Skip undefined values and functions
 * - Properly escape strings
 */
function customStringify(value) {
    // Handle null explicitly
    if (value === null) return 'null';

    const type = typeof value;

    // Handle primitives
    if (type === 'number' || type === 'boolean') {
        return String(value);
    }

    if (type === 'string') {
        // Escape quotes and return quoted string
        return `"${value.replace(/"/g, '\\"')}"`;
    }

    // Handle arrays
    if (Array.isArray(value)) {
        const elements = value.map(item => {
            const stringified = customStringify(item);
            return stringified !== undefined ? stringified : 'null';
        });
        return `[${elements.join(',')}]`;
    }

    // Handle objects
    if (type === 'object') {
        const entries = Object.entries(value).map(([key, val]) => {
            const stringifiedValue = customStringify(val);
            // Skip undefined values (like JSON.stringify does)
            if (stringifiedValue === undefined) return undefined;
            return `"${key}":${stringifiedValue}`;
        }).filter(Boolean); // Remove undefined entries
        
        return `{${entries.join(',')}}`;
    }

    // Skip functions, undefined, symbols
    return undefined;
}

// Test cases:
// console.log(customStringify({ a: 1, b: "hello", c: null, d: undefined }));
// console.log(customStringify([1, "test", null, undefined, true]));

/**
 * EXAMPLE 9: IN-MEMORY DATABASE IMPLEMENTATION
 * 
 * Interview Question: "Implement a simple in-memory database with PUT, GET, DELETE operations."
 * 
 * Requirements:
 * - Store key-value pairs
 * - Support basic CRUD operations
 * - Provide feedback for operations
 * - Handle edge cases (missing keys, etc.)
 */
function createInMemoryDB() {
    // Private storage using closure
    const store = {};

    return {
        /**
         * PUT operation - Store key-value pair
         * @param {string} key - Key to store
         * @param {*} value - Value to store
         */
        put(key, value) {
            store[key] = value;
            console.log(`PUT: ${key} = ${JSON.stringify(value)}`);
        },

        /**
         * GET operation - Retrieve value by key
         * @param {string} key - Key to retrieve
         * @returns {*} - Stored value or null if not found
         */
        get(key) {
            if (key in store) {
                const value = store[key];
                console.log(`GET: ${key} => ${JSON.stringify(value)}`);
                return value;
            } else {
                console.log(`GET: ${key} not found`);
                return null;
            }
        },

        /**
         * DELETE operation - Remove key-value pair
         * @param {string} key - Key to delete
         * @returns {boolean} - True if deleted, false if not found
         */
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

        /**
         * PRINT operation - Display current database state
         */
        print() {
            console.log('Current DB State:', JSON.stringify(store, null, 2));
        },

        /**
         * SIZE operation - Get number of stored items
         * @returns {number} - Number of key-value pairs
         */
        size() {
            return Object.keys(store).length;
        },

        /**
         * CLEAR operation - Remove all data
         */
        clear() {
            Object.keys(store).forEach(key => delete store[key]);
            console.log('Database cleared');
        },

        /**
         * EXISTS operation - Check if key exists
         * @param {string} key - Key to check
         * @returns {boolean} - True if key exists
         */
        exists(key) {
            return key in store;
        }
    };
}

// Example usage:
// const db = createInMemoryDB();
// db.put("name", "Akshat");
// db.put("age", 25);
// db.get("name");        // "Akshat"
// db.get("city");        // null
// db.delete("age");      // true
// db.delete("city");     // false
// db.print();            // Shows current state

/**
 * EXAMPLE 10: DOMAIN OPERATIONS SYSTEM
 *
 * Interview Question: "Implement a system that handles domain-to-IP mapping operations."
 *
 * Operations:
 * - PUT domain ip: Store domain-to-IP mapping
 * - GET domain: Retrieve IP for domain
 * - COUNT domain: Count domains ending with given suffix
 *
 * This tests:
 * - String manipulation
 * - Data structure operations
 * - Algorithm implementation
 * - Edge case handling
 */
const operations = [
    ["PUT", "www.apple.com", "10.20.30.40"],
    ["PUT", "jobs.apple.com", "10.20.30.50"],
    ["PUT", "sites.google.com", "142.258.145.693"],
    ["GET", "sample.com"],
    ["GET", "www.apple.com"],
    ["COUNT", "apple.com"],
    ["COUNT", "com"]
];

/**
 * DOMAIN OPERATIONS PROCESSOR
 *
 * @param {Array} operations - Array of operation arrays
 * @returns {Array} - Array of results for GET and COUNT operations
 *
 * Algorithm:
 * 1. Maintain in-memory storage for domain-IP mappings
 * 2. Process each operation based on type
 * 3. For GET: return IP or "null" if not found
 * 4. For COUNT: count domains ending with given suffix
 * 5. For PUT: store domain-IP mapping
 */
function processDomainOperations(operations) {
    const result = [];
    const memory = {}; // Storage for domain-IP mappings

    /**
     * PUT operation - Store domain-IP mapping
     * @param {string} domain - Domain name
     * @param {string} ip - IP address
     */
    function put(domain, ip) {
        memory[domain] = ip;
        console.log(`Stored: ${domain} -> ${ip}`);
    }

    /**
     * GET operation - Retrieve IP for domain
     * @param {string} domain - Domain name to lookup
     */
    function get(domain) {
        if (memory.hasOwnProperty(domain)) {
            const ip = memory[domain];
            result.push(ip);
            console.log(`Found: ${domain} -> ${ip}`);
        } else {
            result.push("null");
            console.log(`Not found: ${domain}`);
        }
    }

    /**
     * COUNT operation - Count domains ending with suffix
     * @param {string} suffix - Domain suffix to count
     */
    function count(suffix) {
        let count = 0;
        
        // Iterate through all stored domains
        for (const domain in memory) {
            // Check if domain ends with the given suffix
            if (domain.endsWith(suffix)) {
                count++;
            }
        }
        
        result.push(count.toString());
        console.log(`Count for suffix "${suffix}": ${count}`);
    }

    // Process each operation
    for (const operation of operations) {
        const [action, domain, ip] = operation;

        // Validate operation format
        if (!operation.every(item => typeof item === 'string')) {
            console.log('Invalid operation format:', operation);
            continue;
        }

        // Execute operation based on action type
        switch (action) {
            case "PUT":
                if (domain && ip) {
                    put(domain, ip);
                } else {
                    console.log('PUT requires domain and IP');
                }
                break;
                
            case "GET":
                if (domain) {
                    get(domain);
                } else {
                    console.log('GET requires domain');
                }
                break;
                
            case "COUNT":
                if (domain) { // domain parameter is used as suffix for COUNT
                    count(domain);
                } else {
                    console.log('COUNT requires suffix');
                }
                break;
                
            default:
                console.log('Unknown operation:', action);
        }
    }

    return result;
}

// Test the domain operations
console.log('\n=== Domain Operations Demo ===');
const domainResults = processDomainOperations(operations);
console.log('\nFinal Results:', domainResults);
// Expected output: ["null", "10.20.30.40", "2", "3"]

/**
 * ADVANCED CHALLENGES AND VARIATIONS
 */

/**
 * Enhanced Domain System with TTL (Time To Live)
 */
class DomainSystemWithTTL {
    constructor() {
        this.storage = new Map();
    }
    
    put(domain, ip, ttl = 3600000) { // Default 1 hour TTL
        const expiryTime = Date.now() + ttl;
        this.storage.set(domain, { ip, expiryTime });
    }
    
    get(domain) {
        const entry = this.storage.get(domain);
        
        if (!entry) return null;
        
        // Check if entry has expired
        if (Date.now() > entry.expiryTime) {
            this.storage.delete(domain);
            return null;
        }
        
        return entry.ip;
    }
    
    count(suffix) {
        let count = 0;
        const now = Date.now();
        
        for (const [domain, entry] of this.storage) {
            // Skip expired entries
            if (now > entry.expiryTime) {
                this.storage.delete(domain);
                continue;
            }
            
            if (domain.endsWith(suffix)) {
                count++;
            }
        }
        
        return count;
    }
    
    cleanup() {
        const now = Date.now();
        for (const [domain, entry] of this.storage) {
            if (now > entry.expiryTime) {
                this.storage.delete(domain);
            }
        }
    }
}

/**
 * INTERVIEW PREPARATION TIPS
 *
 * Common JavaScript Interview Topics:
 *
 * 1. SCOPE AND CLOSURES:
 *    - Lexical scoping
 *    - Function closures
 *    - Module pattern
 *
 * 2. ASYNCHRONOUS PROGRAMMING:
 *    - Promises and async/await
 *    - Event loop understanding
 *    - Callback patterns
 *
 * 3. OBJECT-ORIENTED CONCEPTS:
 *    - Prototypal inheritance
 *    - 'this' binding rules
 *    - Class vs function constructors
 *
 * 4. FUNCTIONAL PROGRAMMING:
 *    - Higher-order functions
 *    - Pure functions
 *    - Immutability concepts
 *
 * 5. DATA STRUCTURES:
 *    - Arrays and objects manipulation
 *    - Set and Map usage
 *    - Custom data structure implementation
 *
 * 6. ALGORITHMS:
 *    - Sorting and searching
 *    - Recursion patterns
 *    - Dynamic programming basics
 *
 * 7. ES6+ FEATURES:
 *    - Destructuring
 *    - Spread/rest operators
 *    - Template literals
 *    - Modules
 *
 * 8. ERROR HANDLING:
 *    - Try-catch patterns
 *    - Promise error handling
 *    - Custom error types
 *
 * 9. PERFORMANCE:
 *    - Time/space complexity
 *    - Memory management
 *    - Optimization techniques
 *
 * 10. BROWSER APIs:
 *     - DOM manipulation
 *     - Event handling
 *     - Local storage
 *     - Fetch API
 */

/**
 * PRACTICE PROBLEMS TO SOLVE:
 *
 * 1. Implement deep clone function
 * 2. Create event emitter class
 * 3. Build promise-based retry mechanism
 * 4. Implement function memoization
 * 5. Create custom array methods
 * 6. Build simple state management system
 * 7. Implement debounce/throttle from scratch
 * 8. Create custom bind/call/apply
 * 9. Build simple template engine
 * 10. Implement observer pattern
 *
 * DEBUGGING SKILLS:
 *
 * 1. Reading stack traces
 * 2. Using browser dev tools
 * 3. Console debugging techniques
 * 4. Performance profiling
 * 5. Memory leak detection
 *
 * BEST PRACTICES:
 *
 * 1. Write readable, maintainable code
 * 2. Handle edge cases properly
 * 3. Use appropriate data structures
 * 4. Consider performance implications
 * 5. Write comprehensive tests
 * 6. Document complex logic
 * 7. Follow consistent coding style
 * 8. Use meaningful variable names
 */
