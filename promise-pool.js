/**
 * PROMISE POOL / CONCURRENCY CONTROL - INTERVIEW QUESTION
 * 
 * What is a Promise Pool?
 * A Promise Pool is a concurrency control mechanism that limits the number of
 * promises that can execute simultaneously. It's essential for managing resource
 * usage and preventing system overload when dealing with many async operations.
 * 
 * Why Use Promise Pools?
 * 1. Rate Limiting: Respect API rate limits and avoid getting blocked
 * 2. Resource Management: Prevent overwhelming servers or databases
 * 3. Memory Control: Avoid creating too many concurrent connections
 * 4. Performance Optimization: Balance speed vs resource usage
 * 5. Error Isolation: Limit blast radius of failures
 * 
 * Real-world Scenarios:
 * - Batch processing large datasets
 * - Image/file processing pipelines
 * - Web scraping with rate limits
 * - Database batch operations
 * - API integrations with third-party services
 * - Parallel downloads/uploads
 */

/**
 * PROBLEM STATEMENT
 * 
 * Given a list of URLs, implement a function that fetches all URLs with a 
 * maximum of n concurrent requests at a time.
 * 
 * Requirements:
 * 1. Only maxConcurrency requests should run in parallel
 * 2. When one finishes, start the next queued request
 * 3. Maintain original order in results array
 * 4. Handle both successful and failed requests gracefully
 * 
 * Example:
 * fetchInBatches(['url1', 'url2', 'url3', 'url4', 'url5'], 2)
 * 
 * Execution Timeline:
 * Time 0: Start url1, url2
 * Time 1: url1 completes, start url3
 * Time 2: url2 completes, start url4  
 * Time 3: url3 completes, start url5
 * Time 4: url4, url5 complete
 */

/**
 * PROMISE POOL IMPLEMENTATION - WORKER PATTERN
 * 
 * This implementation uses the "worker" pattern where each worker
 * continuously processes items from a shared queue until exhausted.
 * 
 * @param {string[]} urls - Array of URLs to fetch
 * @param {number} maxConcurrency - Maximum number of concurrent requests
 * @returns {Promise<Array>} - Promise resolving to array of results in original order
 * 
 * Algorithm:
 * 1. Create shared index counter for queue position
 * 2. Create results array pre-allocated to maintain order
 * 3. Spawn maxConcurrency worker functions
 * 4. Each worker processes items until queue is exhausted
 * 5. Wait for all workers to complete using Promise.all()
 */
async function fetchInBatches(urls, maxConcurrency) {
    // Pre-allocate results array to maintain original order
    const results = new Array(urls.length);
    
    // Shared index counter - each worker will increment this atomically
    let currentIndex = 0;
    
    /**
     * WORKER FUNCTION
     * 
     * Each worker continuously processes items from the queue
     * until all items are processed. The shared index ensures
     * no two workers process the same item.
     */
    async function worker() {
        // Continue until all items are processed
        while (currentIndex < urls.length) {
            // Atomically get next item index and increment counter
            const itemIndex = currentIndex++;
            
            // Check if we've exceeded array bounds (race condition protection)
            if (itemIndex >= urls.length) {
                break;
            }
            
            const url = urls[itemIndex];
            
            try {
                console.log(`🚀 Worker starting request ${itemIndex + 1}: ${url}`);
                
                // Perform the actual fetch operation
                const response = await fetch(url);
                
                // Check if response is successful
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                // Parse response data
                const data = await response.text(); // or response.json() for JSON APIs
                
                // Store result at correct index to maintain order
                results[itemIndex] = {
                    success: true,
                    data: data,
                    url: url,
                    index: itemIndex
                };
                
                console.log(`✅ Worker completed request ${itemIndex + 1}`);
                
            } catch (error) {
                console.log(`❌ Worker failed request ${itemIndex + 1}: ${error.message}`);
                
                // Store error result at correct index
                results[itemIndex] = {
                    success: false,
                    error: error.message,
                    url: url,
                    index: itemIndex
                };
            }
        }
        
        console.log(`🏁 Worker finished processing`);
    }
    
    // Create array of worker promises (maxConcurrency workers)
    const workers = Array.from({ length: maxConcurrency }, () => worker());
    
    console.log(`📊 Created ${maxConcurrency} workers for ${urls.length} URLs`);
    
    // Wait for all workers to complete
    await Promise.all(workers);
    
    console.log(`🎉 All workers completed`);
    return results;
}

/**
 * ALTERNATIVE IMPLEMENTATION - BATCH PROCESSING
 * 
 * This approach processes URLs in fixed-size batches sequentially.
 * Each batch processes up to maxConcurrency items in parallel.
 */
async function fetchInBatchesSequential(urls, maxConcurrency) {
    const results = [];
    
    // Process URLs in chunks of maxConcurrency
    for (let i = 0; i < urls.length; i += maxConcurrency) {
        // Get current batch
        const batch = urls.slice(i, i + maxConcurrency);
        
        console.log(`Processing batch ${Math.floor(i / maxConcurrency) + 1}: ${batch.length} items`);
        
        // Process all items in current batch concurrently
        const batchPromises = batch.map(async (url, batchIndex) => {
            const globalIndex = i + batchIndex;
            
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                const data = await response.text();
                return { success: true, data, url, index: globalIndex };
            } catch (error) {
                return { success: false, error: error.message, url, index: globalIndex };
            }
        });
        
        // Wait for current batch to complete before starting next batch
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
    }
    
    return results;
}

/**
 * GENERIC PROMISE POOL UTILITY
 * 
 * A reusable utility that can handle any async operation, not just fetch
 */
class PromisePool {
    constructor(concurrency = 5) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }
    
    /**
     * Add a task to the pool
     * @param {Function} taskFn - Function that returns a Promise
     * @returns {Promise} - Promise that resolves with task result
     */
    add(taskFn) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                taskFn,
                resolve,
                reject
            });
            
            this.process();
        });
    }
    
    /**
     * Process queued tasks respecting concurrency limit
     */
    async process() {
        if (this.running >= this.concurrency || this.queue.length === 0) {
            return;
        }
        
        this.running++;
        const { taskFn, resolve, reject } = this.queue.shift();
        
        try {
            const result = await taskFn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.running--;
            this.process(); // Process next task
        }
    }
    
    /**
     * Add multiple tasks and wait for all to complete
     * @param {Function[]} tasks - Array of functions that return Promises
     * @returns {Promise<Array>} - Promise resolving to array of results
     */
    async addAll(tasks) {
        const promises = tasks.map(task => this.add(task));
        return Promise.all(promises);
    }
}

/**
 * DEMONSTRATION DATA
 */
const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3',
    'https://jsonplaceholder.typicode.com/posts/4',
    'https://jsonplaceholder.typicode.com/posts/5'
];

/**
 * DEMO EXECUTION
 */
console.log('=== Promise Pool Demo ===');

// Test the worker-based implementation
fetchInBatches(urls, 2).then(results => {
    console.log('\n📋 Final Results:');
    results.forEach((result, index) => {
        if (result.success) {
            console.log(`✅ ${index + 1}. Success: ${result.url}`);
        } else {
            console.log(`❌ ${index + 1}. Failed: ${result.url} - ${result.error}`);
        }
    });
}).catch(error => {
    console.error('💥 Error:', error);
});

/**
 * ADVANCED PATTERNS
 */

/**
 * Promise Pool with Priority Queue
 * Allows high-priority tasks to jump ahead in the queue
 */
class PriorityPromisePool {
    constructor(concurrency = 5) {
        this.concurrency = concurrency;
        this.running = 0;
        this.highPriorityQueue = [];
        this.normalQueue = [];
    }
    
    add(taskFn, priority = 'normal') {
        return new Promise((resolve, reject) => {
            const task = { taskFn, resolve, reject };
            
            if (priority === 'high') {
                this.highPriorityQueue.push(task);
            } else {
                this.normalQueue.push(task);
            }
            
            this.process();
        });
    }
    
    getNextTask() {
        // Process high priority tasks first
        if (this.highPriorityQueue.length > 0) {
            return this.highPriorityQueue.shift();
        }
        return this.normalQueue.shift();
    }
    
    async process() {
        if (this.running >= this.concurrency) {
            return;
        }
        
        const task = this.getNextTask();
        if (!task) {
            return;
        }
        
        this.running++;
        
        try {
            const result = await task.taskFn();
            task.resolve(result);
        } catch (error) {
            task.reject(error);
        } finally {
            this.running--;
            this.process();
        }
    }
}

/**
 * Promise Pool with Rate Limiting
 * Adds delay between task executions to respect rate limits
 */
class RateLimitedPromisePool {
    constructor(concurrency = 5, rateLimit = 1000) {
        this.concurrency = concurrency;
        this.rateLimit = rateLimit; // ms between requests
        this.running = 0;
        this.queue = [];
        this.lastExecution = 0;
    }
    
    async add(taskFn) {
        return new Promise((resolve, reject) => {
            this.queue.push({ taskFn, resolve, reject });
            this.process();
        });
    }
    
    async process() {
        if (this.running >= this.concurrency || this.queue.length === 0) {
            return;
        }
        
        // Check rate limit
        const now = Date.now();
        const timeSinceLastExecution = now - this.lastExecution;
        
        if (timeSinceLastExecution < this.rateLimit) {
            const delay = this.rateLimit - timeSinceLastExecution;
            setTimeout(() => this.process(), delay);
            return;
        }
        
        this.running++;
        this.lastExecution = Date.now();
        
        const { taskFn, resolve, reject } = this.queue.shift();
        
        try {
            const result = await taskFn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.running--;
            setTimeout(() => this.process(), this.rateLimit);
        }
    }
}

/**
 * INTERVIEW QUESTIONS TO PRACTICE:
 * 
 * 1. Implement promise pool with timeout per task
 * 2. Create promise pool that can be paused/resumed
 * 3. Design promise pool with different concurrency limits per task type
 * 4. Implement promise pool with retry logic for failed tasks
 * 5. Create promise pool that respects both concurrency and rate limits
 * 6. Design promise pool with progress tracking and cancellation
 * 7. Implement promise pool that can dynamically adjust concurrency
 * 8. Create promise pool with circuit breaker pattern
 * 
 * PERFORMANCE CONSIDERATIONS:
 * 
 * 1. Memory Usage: Large queues can consume significant memory
 * 2. Error Handling: Failed tasks shouldn't block other tasks
 * 3. Backpressure: Handle cases where tasks are added faster than processed
 * 4. Resource Cleanup: Ensure proper cleanup of resources on completion/error
 * 5. Monitoring: Track queue size, completion rates, error rates
 * 
 * COMMON PITFALLS:
 * 
 * 1. Not maintaining result order when order matters
 * 2. Creating too many concurrent connections and overwhelming servers
 * 3. Not handling partial failures gracefully
 * 4. Ignoring rate limits and getting blocked by APIs
 * 5. Not implementing proper error isolation between tasks
 * 6. Memory leaks from not cleaning up completed tasks
 * 7. Race conditions in shared state management
 */
