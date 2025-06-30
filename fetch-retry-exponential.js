/* 🧠 Coding Challenge: Retry with Exponential Backoff
❓ Problem Statement
Implement a function fetchWithRetry that wraps around fetch and automatically retries failed requests using exponential backoff strategy.

✅ Requirements
fetchWithRetry(url, options, maxRetries, baseDelay): Promise<Response>
url: URL to fetch

options: standard fetch options

maxRetries: number of times to retry on failure

baseDelay: delay in milliseconds (used for exponential backoff)

Behavior:
Retry only on network errors or 5xx server errors

Wait time increases exponentially:
delay = baseDelay * (2 ^ attemptNumber)

On success: resolve the response

On final failure: reject the error */



function fetchWithRetry(fn, options = {}, maxTries = 4, baseDelay = 500) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const retryFn = async () => {
      try {
        const data = await fn(); // works with async fn or Promise-returning fn
        if (data.response) {
          return resolve(data.response);
        }
        throw new Error('No response'); // fallback if no response field
      } catch (error) {
        if (attempts < maxTries) {
          const delay = baseDelay * Math.pow(2, attempts);
          console.log(`🔁 Retry #${attempts + 1} in ${delay}ms`);
          attempts++;
          setTimeout(retryFn, delay);
        } else {
          reject(`❌ Failed after ${maxTries} attempts: ${error.message}`);
        }
      }
    };

    retryFn();
  });
}


const apiCall = () => {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    console.log(`🎲 API random value: ${random.toFixed(2)}`);

    if (random < 0.7) {
      reject(new Error("Random failure")); // 70% chance of failure
    } else {
      resolve({ response: '✅ SUCCESS' });
    }
  });
};

fetchWithRetry(apiCall, {}, 4, 500)
  .then(data => console.log('✅ Final Result:', data))
  .catch(error => console.error('❌ Error:', error));
