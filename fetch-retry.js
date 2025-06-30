function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(apiCall, maxRetries = 5, delay = 2000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await apiCall(); // try the API call
            return response; // success
        } catch (error) {
            console.log(`Attempt ${attempt} failed.`);

            if (attempt === maxRetries) {
                console.log("All attempts failed. Going to fail block.");
                throw new Error("API call failed after multiple attempts.");
            }

            console.log(`Retrying in ${delay / 1000} seconds...`);
            await wait(delay); // wait before retrying
        }
    }
}

async function dummyApiCall() {
    // Simulate 50% chance of failure
    if (Math.random() < 0.9) {
        throw new Error("API failed");
    }
    return "Success!";
}

fetchWithRetry(dummyApiCall)
    .then(result => console.log("API call succeeded:", result))
    .catch(err => console.error("API call ultimately failed:", err.message));
