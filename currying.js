// Currying Implementation - transforms multi-argument function into sequence of single-argument functions

function add(a) {
    return function(b) {
        if (b !== undefined) {
            return add(a + b);
        }
        return a;
    }
}

console.log(add(1)(2)(3)()); // Output: 6

// Arrow function version - more concise
const addArrow = (a) => (b) => b !== undefined ? addArrow(a + b) : a;

console.log(addArrow(5)(10)(15)()); // Output: 30

// Practical example: API call builder
const apiCall = (baseUrl) => (endpoint) => (params) => {
    return `${baseUrl}/${endpoint}?${new URLSearchParams(params).toString()}`;
};

const githubAPI = apiCall('https://api.github.com');
const usersEndpoint = githubAPI('users');
// Usage: usersEndpoint({ per_page: 10, page: 1 })
