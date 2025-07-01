// Debouncing - delays function execution until after specified time of inactivity

function debounce(fn, delay) {
    let timer;
    return function(...args) {
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}

// Example: Search function that should only execute after user stops typing
const search = (query) => {
    console.log("Searching for:", query);
    // In real app: fetch(`/api/search?q=${query}`)
};

const debouncedSearch = debounce(search, 1000);

// These calls will be debounced - only the last one executes after 1000ms
debouncedSearch("a");    // Canceled
debouncedSearch("ak");   // Canceled  
debouncedSearch("aks");  // This executes after 1000ms

// Real-world examples:
// - Search input: debounce(handleSearch, 300)
// - Window resize: debounce(handleResize, 250)
// - Form validation: debounce(validateForm, 500)
// - Auto-save: debounce(saveDocument, 2000)