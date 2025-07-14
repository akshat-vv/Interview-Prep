/**
 * EXPONENTIAL BACKOFF RETRY MECHANISM - INTERVIEW QUESTION
 * 
 * What is Exponential Backoff?
 * Exponential backoff is a retry strategy where the delay between retry attempts
 * increases exponentially. This prevents overwhelming a failing service and
 * gives it time to recover.
 * 
 * Formula: delay = baseDelay * (2 ^ attemptNumber)
 * Example: 500ms, 1000ms, 2000ms, 4000ms, 8000ms...
 * 
 * Why Use Exponential Backoff?
 * 1. Reduces load on failing services
 * 2. Prevents thundering herd problems
 * 3. Gives services time to recover
 * 4. More respectful to rate limits
 * 5. Industry standard for resilient systems
 * 
 * Real-world Applications:
 * - AWS SDK retry logic
 * - Database connection retries
 * - API client libraries
 * - Microservices communication
 * - Message queue processing
 * - Network request handling
 */

/**
 * PROBLEM STATEMENT
 * 
 * Implement a function fetchWithRetry that wraps around fetch and automatically
 * retries failed requests using exponential backoff strategy.
 * 
 * Requirements:
 * - fetchWithRetry(url, options, maxRetries, baseDelay): Promise<Response>
 * - Retry only on network errors or 5xx server errors
 * - Wait time increases exponentially: delay = baseDelay * (2 ^ attemptNumber)
 * - On success: resolve the response
 * - On final failure: reject the error
 * 
 * Parameters:
 * @param {Function} fn - Function that returns a Promise (API call)
 * @param {Object} options - Configuration options (not used in this implementation)
 * @param {number} maxTries - Maximum number of retry attempts
 * @param {number} baseDelay - Base delay in milliseconds for exponential backoff
 * @returns {Promise} - Promise that resolves with success or rejects after all retries
 */

/**
 * EXPONENTIAL BACKOFF RETRY IMPLEMENTATION
 * 
 * This implementation uses a recursive approach with setTimeout to handle
 * the exponential delay between retry attempts.
 * 
 * Algorithm:
 * 1. Try to execute the function
 * 2. If successful, resolve with the result
 * 3. If failed and retries remaining:
 *    - Calculate exponential delay: baseDelay * (2 ^ attempts)
 *    - Wait for the calculated delay
 *    - Retry the function
 * 4. If all retries exhausted, reject with final error
 */
function fetchWithRetry(fn, options = {}, maxTries = 4, baseDelay = 500) {
    return new Promise((resolve, reject) => {
        let attempts = 0; // Track current attempt number

        const retryFn = async () => {
            try {
                console.log(`🚀 Attempt ${attempts + 1}/${maxTries}`);
            
                const data = await fn();
                
                // Check if response exists (handle different response formats)
                if (data && data.response) {
                    console.log(`✅ Success on attempt ${attempts + 1}`);
                    return resolve(data.response);
                }
                
                // If no response field, assume the data itself is the response
                if (data) {
                    console.log(`✅ Success on attempt ${attempts + 1}`);
                    return resolve(data);
                }
                
                // Fallback error if no valid response
                throw new Error('No valid response received');
                
            } catch (error) {
                console.log(`❌ Attempt ${attempts + 1} failed: ${error.message}`);
                
                // Check if we have retries remaining
                if (attempts < maxTries - 1) {
                    // Calculate exponential backoff delay
                    // Formula: baseDelay * (2 ^ attempts)
                    const delay = baseDelay * Math.pow(2, attempts);
                    
                    console.log(`⏳ Retrying in ${delay}ms (attempt ${attempts + 2}/${maxTries})`);
                    
                    attempts++; // Increment attempt counter
                    
                    // Schedule next retry after exponential delay
                    setTimeout(retryFn, delay);
                } else {
                    // All retries exhausted - reject with final error
                    console.log(`🚫 All ${maxTries} attempts failed`);
                    reject(new Error(`Failed after ${maxTries} attempts: ${error.message}`));
                }
            }
        };

        // Start the retry process
        retryFn();
    });
}

/**
 * SMART RETRY WITH CONDITION CHECKING
 * 
 * Only retries on specific types of errors (network errors, 5xx status codes)
 */
function fetchWithSmartRetry(fn, options = {}) {
    const {
        maxTries = 4,
        baseDelay = 500,
        retryCondition = (error) => shouldRetryError(error)
    } = options;

    return new Promise((resolve, reject) => {
        let attempts = 0;

        const retryFn = async () => {
            try {
                const data = await fn();
                resolve(data);
            } catch (error) {
                // Check if this error should be retried
                if (attempts < maxTries - 1 && retryCondition(error)) {
                    const delay = baseDelay * Math.pow(2, attempts);
                    console.log(`⏳ Retrying retriable error in ${delay}ms`);
                    
                    attempts++;
                    setTimeout(retryFn, delay);
                } else {
                    // Either max retries reached or error is not retriable
                    const reason = attempts >= maxTries - 1 ? 'max retries reached' : 'error not retriable';
                    console.log(`🚫 Not retrying: ${reason}`);
                    reject(error);
                }
            }
        };

        retryFn();
    });
}

/**
 * HELPER FUNCTION: Determine if error should be retried
 * 
 * @param {Error} error - The error that occurred
 * @returns {boolean} - True if error should be retried
 */
function shouldRetryError(error) {
    // Network errors - should retry
    if (error.name === 'NetworkError' || error.message.includes('network')) {
        return true;
    }
    
    // Timeout errors - should retry
    if (error.name === 'TimeoutError' || error.message.includes('timeout')) {
        return true;
    }
    
    // If it's an HTTP response error, check status code
    if (error.response && error.response.status) {
        const status = error.response.status;
        
        // Retry on server errors (5xx) and rate limiting (429)
        if (status >= 500 || status === 429) {
            return true;
        }
        
        // Don't retry client errors (4xx)
        if (status >= 400 && status < 500) {
            return false;
        }
    }
    
    // Default: retry unknown errors (conservative approach)
    return true;
}

/**
 * DEMO: SIMULATED API CALL
 * 
 * This function simulates an API call that fails 70% of the time.
 * It's useful for testing the retry mechanism.
 */
const apiCall = () => {
    return new Promise((resolve, reject) => {
        const random = Math.random();
        console.log(`🎲 API random value: ${random.toFixed(2)}`);

        // Simulate different types of failures
        if (random < 0.4) {
            reject(new Error("Network timeout")); // 40% chance
        } else if (random < 0.7) {
            reject(new Error("Server error 500")); // 30% chance
        } else {
            // 30% chance of success
            resolve({ response: '✅ API call successful!' });
        }
    });
};

/**
 * REAL-WORLD FETCH EXAMPLE
 * 
 * Example of using exponential backoff with actual HTTP requests
 */
async function fetchWithExponentialBackoff(url, options = {}) {
    const {
        maxTries = 3,
        baseDelay = 1000,
        timeout = 5000
    } = options;

    const fetchFn = async () => {
        // Add timeout to fetch request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // Check if response is successful
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    };

    return fetchWithRetry(fetchFn, {}, maxTries, baseDelay);
}

// Test the retry mechanism with simulated API
fetchWithRetry(apiCall, {}, 4, 500)
    .then(data => {
        console.log('🎉 Final Result:', data);
    })
    .catch(error => {
        console.error('💥 Final Error:', error.message);
    });
