/* 🧠 Coding Challenge: Parallel + Sequential Fetch with Max Concurrency
❓ Problem Statement
You are given a list of URLs. Implement a function that fetches all URLs with a maximum of n concurrent requests at a time.

This is useful in real-world apps when hitting:

rate-limited APIs

slow batch jobs

large-scale image processing 

fetchInBatches(urls: string[], maxConcurrency: number): Promise<string[]>

Behavior:
Only maxConcurrency requests should run in parallel

When one finishes, start the next

Maintain original order in results

Example - 
const urls = [
  'https://api.example.com/1',
  'https://api.example.com/2',
  'https://api.example.com/3',
  'https://api.example.com/4',
  'https://api.example.com/5'
];

fetchInBatches(urls, 2).then(console.log);

Explanation:

Requests 1 & 2 start

As each finishes, 3, then 4, then 5 start — but never more than 2 at once */


async function fetchInBatches(urls, maxConcurrency) {
  const results = new Array(urls.length); // to maintain order
  let index = 0;

  async function worker() {
    while (index < urls.length) {
      const currentIndex = index++;
      const url = urls[currentIndex];

      try {
        const response = await fetch(url);
        const data = await response.text(); // or response.json()
        results[currentIndex] = data;
      } catch (err) {
        results[currentIndex] = `❌ Error: ${err.message}`;
      }
    }
  }

  // Start up to maxConcurrency workers
  const workers = Array.from({ length: maxConcurrency }, () => worker());
  console.log("WORKErs", workers);
  await Promise.all(workers);

  return results;
}


const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
  'https://jsonplaceholder.typicode.com/posts/4',
  'https://jsonplaceholder.typicode.com/posts/5'
];

fetchInBatches(urls, 2).then(results => {
  results.forEach((res, i) => {
    console.log(`Result for URL ${i + 1}:\n`, res);
  });
});
