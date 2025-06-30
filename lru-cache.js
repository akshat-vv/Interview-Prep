class LRUCache{
    constructor(capacity){
        this.capacity = capacity;
        this.cache = new Map();
    }
    
    get(key){
        
        if(!this.cache.has(key)) return -1;
        
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key,value);
        return this.cache.get(key);
    }
    
    put(key,value){
        if(this.cache.get(key)){
            this.cache.delete(key);
        }else if(this.cache.size >= this.capacity){
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key,value);
    }
    
    getMap(){
        console.log(this.cache);
    }
}


const lru = new LRUCache(3);
lru.put(1, 10);
lru.put(2, 20);
lru.put(3, 30);
console.log(lru.get(1)); // 10
lru.put(4, 40); // evicts key 2
console.log(lru.get(2)); // -1
lru.getMap(); // Map(3) { 3 => 30, 1 => 10, 4 => 40 }