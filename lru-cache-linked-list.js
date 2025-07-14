class Node {
    constructor(key,value){
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache{
    constructor(capacity){
        this.capacity = capacity;
        this.cache =  new Map(); 
        
        
        this.head = new Node(0,0);
        this.tail = new Node(0,0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }


    _remove(node){
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    _insert(node){
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }


    get(key){
        if(!this.cache.has(key)) return -1;

        const node = this.cache.get(key);
        this._remove(node);
        this._insert(node);
        return node.value;

    }


    put(key, value){
        if(this.cache.has(key)){
            this._remove(this.cache.get(key));
        }

        const node = new Node(key, value);
        this._insert(node);
        this.cache.set(key, node);


        if(this.cache.size > this.capacity){
            const lru = this.tail.prev;
            this._remove(lru);
            this.cache.delete(lru.key)
        }
    }

    printCache(){
        let curr = this.head.next;
        const items = [];
        while(curr !==this.tail){
            items.push(`[${curr.key}: ${curr.value}]`);
            curr = curr.next;
        }

        console.log('CACHE', items.join('->'))
    }

}



const lru = new LRUCache(3);
lru.put(1, 'A');
lru.put(2, 'B');
lru.put(3, 'C');
lru.printCache(); // [3:C] -> [2:B] -> [1:A]

lru.get(2);       // Move 2 to front
lru.printCache(); // [2:B] -> [3:C] -> [1:A]

lru.put(4, 'D');  // Evict 1 (least recently used)
lru.printCache(); // [4:D] -> [2:B] -> [3:C]

console.log(lru.get(1)); // -1 (evicted)
console.log(lru.get(3)); // C (moved to front)
lru.printCache(); // [3:C] -> [4:D] -> [2:B]