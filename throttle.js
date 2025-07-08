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


const throttled = throttle(() => {
  console.log('Throttled at', Date.now());
}, 1000);


setInterval(throttled, 200);

// Real-world examples:
// - Scroll events: throttle(updateScrollPosition, 100)
// - Mouse movement: throttle(trackCursor, 50)
// - Button clicks: throttle(handleSubmit, 2000)
// - API calls: throttle(fetchData, 1000)
