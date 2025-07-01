// TTL Cache - Time-To-Live cache with automatic expiration

class TTLCache {
    constructor() {
        this.cache = new Map();
    }

    set(key, value, ttl) {
        const expiresAt = Date.now() + ttl;
        this.cache.set(key, { value, expiresAt });
    }

    get(key) {
        const entry = this.cache.get(key);
        if (!entry) return null;

        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key); // Lazy cleanup
            return null;
        }

        return entry.value;
    }

    delete(key) {
        return this.cache.delete(key);
    }

    // Manual cleanup of expired entries
    cleanup() {
        const now = Date.now();
        for (const [key, entry] of this.cache) {
            if (now > entry.expiresAt) {
                this.cache.delete(key);
            }
        }
    }
}

// Example usage:
const cache = new TTLCache();

cache.set('foo', 'bar', 1000); // TTL: 1 second
console.log(cache.get('foo')); // 'bar'

setTimeout(() => {
    console.log(cache.get('foo')); // null (expired)
}, 1500);