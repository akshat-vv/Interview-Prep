
const memoize = (fn)=>{
    const cache = new Map();

    return (...args) => {
        const argsToString = JSON.stringify(args);
        console.log(argsToString);
        if(cache.has(argsToString)){
            console.log("RETURING FROM CACHE", args);
            return cache.get(argsToString);
        }else{
            console.log("CALCULATING", args);
            const result = fn.apply(this, args);
            cache.set(argsToString, result);
            return result;
        }
    }
}


// const addThreeNums = (a,b,c) => a+b+c;

// const add = memoize(addThreeNums);
// console.log(add(1,2,3));
// console.log(add(1,2,3));
// console.log(add(1,2,3));

const fact = memoize((x)=> {
    if(x === 0) return 1;
    else return x * fact(x-1);
});
console.log(fact(5));
console.log(fact(6));
