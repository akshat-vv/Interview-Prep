// LRU Cache - Least Recently Used cache with O(1) operations

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // Maintains insertion order
    }
    
    get(key) {
        if (!this.cache.has(key)) return -1;
        
        // Move to end (most recently used)
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }
    
    put(key, value) {
        if (this.cache.has(key)) {
            // Update existing key
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // Remove least recently used (first item)
            const lruKey = this.cache.keys().next().value;
            this.cache.delete(lruKey);
        }
        
        this.cache.set(key, value);
    }
    
    // Utility method to see current state
    getMap() {
        console.log(this.cache);
    }
}

// Example usage:
const lru = new LRUCache(3);
lru.put(1, 10);
lru.put(2, 20);
lru.put(3, 30);
console.log(lru.get(1)); // 10, moves key 1 to end
lru.put(4, 40); // evicts key 2 (least recently used)
console.log(lru.get(2)); // -1 (not found)
lru.getMap(); // Shows current cache state