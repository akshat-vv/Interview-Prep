/*🧠 Coding Challenge: TTL Cache (In-Memory Key-Value Store with Expiry)
❓ Problem Statement
Design and implement a class TTLCache that functions as an in-memory key-value store with support for time-to-live (TTL) expiry.

The cache should automatically handle expired entries on access and optionally expose utility methods.

✅ Requirements
Implement the following methods:

set(key: string, value: any, ttl: number): void
Stores the value under key with a TTL in milliseconds.

After ttl ms, the key should expire.

get(key: string): any | null
Returns the value if the key exists and is not expired.

Returns null if the key is expired or missing.

delete(key: string): boolean
Deletes the key from the cache.

Returns true if the key existed, otherwise false.

🚀 Bonus (Optional)
has(key: string): boolean
Returns true if the key exists and is not expired.

clear(): void
Clears the entire cache.

Auto Cleanup (Advanced)
Periodically remove expired keys in the background (using setInterval).

Example Usage 

const cache = new TTLCache();

cache.set('foo', 'bar', 1000); // TTL: 1 second
console.log(cache.get('foo')); // Output: 'bar'

setTimeout(() => {
  console.log(cache.get('foo')); // Output: null (expired)
}, 1500);

🧠 Constraints
Use only in-memory data structures (like Map or Object).

Use Date.now() for current time.

Do not use localStorage, sessionStorage, or any backend.

*/

class TTLCache {

  constructor(){
    this.cache = new Map()
  }


  set(key, value, ttl) {
    const expiresAt = Date.now() + ttl;
    this.cache.set(key, { value, expiresAt });
  }


  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  delete(key){
    return this.cache.delete(key);
  }

}



const cache = new TTLCache();

cache.set('foo', 'bar', 1000); // TTL: 1 second
console.log(cache.get('foo')); // Output: 'bar'

setTimeout(() => {
  console.log(cache.get('foo')); // Output: null (expired)
}, 1500);