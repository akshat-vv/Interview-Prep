# Currying - Detailed Explanation

## What is Currying?

Currying is a functional programming technique where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument.

## How It Works

```javascript
// Instead of: add(1, 2, 3)
// Currying allows: add(1)(2)(3)
```

## Implementation Details

### Traditional Function Approach
```javascript
function add(a) {
    return function(b) {
        if (b !== undefined) {
            return add(a + b);  // Recursive call with accumulated sum
        }
        return a;  // Return final result when no more arguments
    }
}
```

### Arrow Function Approach
```javascript
const add = (a) => (b) => b !== undefined ? add(a + b) : a;
```

## Key Concepts

1. **Closure**: Inner function has access to outer function's variables
2. **Recursion**: Function calls itself with accumulated values
3. **Partial Application**: Creating specialized functions with preset arguments

## Real-World Applications

### API Call Builder
```javascript
const apiCall = (baseUrl) => (endpoint) => (params) => {
    return `${baseUrl}/${endpoint}?${new URLSearchParams(params).toString()}`;
};

// Create specialized API callers
const githubAPI = apiCall('https://api.github.com');
const usersEndpoint = githubAPI('users');
const result = usersEndpoint({ per_page: 10, page: 1 });
```

### Event Handler Factory
```javascript
const createEventHandler = (eventType) => (element) => (callback) => {
    element.addEventListener(eventType, callback);
};

const onClick = createEventHandler('click');
const onButtonClick = onClick(buttonElement);
onButtonClick(() => console.log('Button clicked!'));
```

## Benefits

- **Reusability**: Create specialized functions from general ones
- **Composition**: Easier to combine functions
- **Readability**: More expressive code in functional programming
- **Testing**: Easier to test individual function stages

## Interview Questions

1. **Q**: Explain the difference between currying and partial application
   **A**: Currying transforms a function to take one argument at a time, while partial application fixes some arguments and returns a function expecting the rest.

2. **Q**: Implement a curry function that can curry any function
   **A**: 
   ```javascript
   function curry(fn) {
       return function curried(...args) {
           if (args.length >= fn.length) {
               return fn.apply(this, args);
           }
           return function(...nextArgs) {
               return curried.apply(this, args.concat(nextArgs));
           }
       }
   }
   ```

3. **Q**: When would you use currying in real applications?
   **A**: Configuration functions, event handlers, API builders, validation functions, and anywhere you need to create specialized versions of general functions.

## Common Pitfalls

1. **Performance**: Curried functions create multiple closures
2. **Debugging**: Stack traces can be harder to read
3. **Overuse**: Not every function benefits from currying
4. **Memory**: Each curried function holds references to outer scope

## Best Practices

1. Use currying for configuration and setup functions
2. Consider performance implications for frequently called functions
3. Provide clear documentation for curried function usage
4. Use TypeScript for better type safety with curried functions