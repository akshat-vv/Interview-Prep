const sleep = (t) => new Promise(res => setTimeout(res, t));

// const tasks = [
//   () => sleep(500).then(() => console.log("Task 1")),
//   () => sleep(300).then(() => console.log("Task 2")),
//   () => sleep(400).then(() => console.log("Task 3")),
//   () => sleep(100).then(() => console.log("Task 4")),
// ];

await promisePool(tasks, 2);

// output 

// Task 2
// Task 1
// Task 4
// Task 3

async function promisePool(tasks, n) {
  let i = 0;

  async function runner() {
    while (i < tasks.length) {
      const task = tasks[i++];
      await task(); // wait for each task before next
    }
  }

  // Start n runners in parallel
  const pool = Array(n).fill(null).map(runner);
  await Promise.all(pool);
}


// 🔥 2. Promise Pool with Result Collection
// Q: Modify the pool to collect the results of all tasks in correct order.

// const tasks = [
//   () => Promise.resolve(1),
//   () => Promise.resolve(2),
//   () => Promise.resolve(3),
// ];

// await promisePoolWithResults(tasks, 2);
// // Should return: [1, 2, 3]


async function promisePoolWithResults(tasks, n) {
  const results = Array(tasks.length);
  let i = 0;

  async function runner() {
    while (i < tasks.length) {
      const idx = i++;
      const res = await tasks[idx]();
      results[idx] = res;
    }
  }

  await Promise.all(Array(n).fill(0).map(runner));
  return results;
}


// ✅ 🔥 Problem
// You have a list of URLs, and you want to fetch them in parallel, but with a limit of 3 concurrent requests at a time.


async function promisePool(tasks, limit) {
  let i = 0;
  const results = [];

  async function runner() {
    while (i < tasks.length) {
      const currentIndex = i++; // capture the index before incrementing
      try {
        const result = await tasks[currentIndex]();
        results[currentIndex] = result;
      } catch (error) {
        results[currentIndex] = { error };
      }
    }
  }

  const pool = Array(limit).fill().map(() => runner());
  await Promise.all(pool);

  return results;
}


const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://jsonplaceholder.typicode.com/todos/4',
  'https://jsonplaceholder.typicode.com/todos/5',
];

const tasks = urls.map(url => () => 
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("✅ Fetched:", url);
      return data;
    })
);

promisePool(tasks, 3).then(results => {
  console.log("🎯 All results:", results);
});
