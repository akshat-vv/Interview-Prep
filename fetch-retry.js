// Fetch with Retry - Basic retry mechanism for failed requests

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(apiCall, maxRetries = 5, delay = 2000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await apiCall();
            return response; // Success
        } catch (error) {
            console.log(`Attempt ${attempt} failed.`);

            if (attempt === maxRetries) {
                console.log("All attempts failed.");
                throw new Error("API call failed after multiple attempts.");
            }

            console.log(`Retrying in ${delay / 1000} seconds...`);
            await wait(delay);
        }
    }
}

// Example API call that fails randomly
async function dummyApiCall() {
    if (Math.random() < 0.9) { // 90% failure rate for demo
        throw new Error("API failed");
    }
    return "Success!";
}

// Usage:
fetchWithRetry(dummyApiCall)
    .then(result => console.log("Final result:", result))
    .catch(err => console.error("Final error:", err.message));
