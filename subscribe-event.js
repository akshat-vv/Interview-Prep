class PubSub {
    constructor(){
        this.events = {};
    }

    subscribe(eventName, callback){
        if(!this.events[eventName]){
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback);

        return ()=>{
            this.events[eventName] = this.events[eventName].filter((cb)=>cb !== callback);
        }
    }

    emit(eventName, ...args){
        const callbacks = this.events[eventName] || [];
        for(const cb of callbacks){
            cb(...args);
        }
    }
}


const pubSub = new PubSub();

const unsub1 = pubSub.subscribe("event1", data => console.log("👂 Listener 1:", data));
const unsub2 = pubSub.subscribe("event1", data => console.log("👂 Listener 2:", data));

pubSub.emit("event1", "🚀 First Call"); // Both listeners fire

unsub1(); // Remove first listener
pubSub.emit("event1", "🧪 Second Call"); // Only listener 2 fires
