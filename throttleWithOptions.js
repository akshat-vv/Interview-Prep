function throttle(fn, wait, options = {}) {
  let timeout = null;
  let lastCallTime = 0;
  let lastArgs;
  let context;

  const { leading = true, trailing = true } = options;

  return function (...args) {
    const now = Date.now();
    context = this;
    const remaining = wait - (now - lastCallTime);

    lastArgs = args;

    const callNow = leading && !timeout && (now - lastCallTime >= wait);

    if (callNow) {
      lastCallTime = now;
      fn.apply(context, args);
    }

    if (!timeout && trailing) {
      timeout = setTimeout(() => {
        if (!leading || now - lastCallTime >= wait) {
          fn.apply(context, lastArgs);
          lastCallTime = Date.now();
        }
        timeout = null;
      }, remaining > 0 ? remaining : wait);
    }
  };
}


const throttled = throttle(() => {
  console.log('Throttled at', Date.now());
}, 1000, { leading: true, trailing: true });

setInterval(throttled, 200); // Logs once every ~1s
