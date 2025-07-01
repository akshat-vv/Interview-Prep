// Throttling - limits function execution to at most once per specified time period

function throttle(fn, limit) {
    let lastCall = 0;
    return function(...args) {
        const context = this;
        const now = Date.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            fn.apply(context, args);
        }
    };
}

// Example: Scroll event handler that executes at most once per second
const logScroll = () => {
    console.log("Scroll event:", Date.now());
    // Update scroll indicators, lazy load images, etc.
};

const throttledScroll = throttle(logScroll, 1000);
window.addEventListener("scroll", throttledScroll);

// Real-world examples:
// - Scroll events: throttle(updateScrollPosition, 100)
// - Mouse movement: throttle(trackCursor, 50)
// - Button clicks: throttle(handleSubmit, 2000)
// - API calls: throttle(fetchData, 1000)
