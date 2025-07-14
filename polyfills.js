// JavaScript Polyfills - Custom implementations of native methods

const arr = [1, 2, 3, 4];

// 1. Array.prototype.map
Array.prototype.myMap = function (callback) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};

// 2. Array.prototype.filter
Array.prototype.myFilter = function (callback) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

// 3. Array.prototype.reduce
Array.prototype.myReduce = function (callback, initialValue) {
    let acc;
    let startIndex;

    if (initialValue !== undefined) {
        acc = initialValue;
        startIndex = 0;
    } else {
        acc = this[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++) {
        acc = callback(acc, this[i], i, this);
    }

    return acc;
};

// 4. Array.prototype.flat
Array.prototype.myFlat = function (depth = 1) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        if (Array.isArray(this[i]) && depth > 0) {
            result.push(...this[i].myFlat(depth - 1));
        } else {
            result.push(this[i]);
        }
    }
    return result;
};

// 5. Array.prototype.forEach
Array.prototype.myForEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
};

// 6. Array.prototype.find
Array.prototype.myFind = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) return this[i];
    }
    return undefined;
};

// 7. Array.prototype.some
Array.prototype.mySome = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) return true;
    }
    return false;
};

// 8. Array.prototype.every
Array.prototype.myEvery = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (!callback(this[i], i, this)) return false;
    }
    return true;
};

// 9. Function.prototype.bind
Function.prototype.myBind = function (context, ...args) {
    const fn = this;
    return function (...restArgs) {
        return fn.apply(context, [...args, ...restArgs]);
    };
};

// 10. Promise.all
function myPromiseAll(pArr) {
    const result = [];
    let completed = 0;

    return new Promise((resolve, reject) => {
        if (pArr.length === 0) return resolve([]);

        for (let i = 0; i < pArr.length; i++) {
            Promise.resolve(pArr[i])
                .then((data) => {
                    result[i] = data;
                    completed++;
                    if (completed === pArr.length) {
                        resolve(result);
                    }
                })
                .catch((err) => reject(err));
        }
    });
}

// 11. Promise.race
function myPromiseRace(pArr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < pArr.length; i++) {
            Promise.resolve(pArr[i])
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        }
    });
}

// 12. Promise.allSettled
function myPromiseAllSettled(pArr) {
    const result = [];
    let settledCount = 0;

    return new Promise((resolve) => {
        if (pArr.length === 0) return resolve([]);

        for (let i = 0; i < pArr.length; i++) {
            Promise.resolve(pArr[i])
                .then((value) => {
                    result[i] = { status: 'fulfilled', value };
                })
                .catch((reason) => {
                    result[i] = { status: 'rejected', reason };
                })
                .finally(() => {
                    settledCount++;
                    if (settledCount === pArr.length) {
                        resolve(result);
                    }
                });
        }
    });
}

// 13. Array.prototype.concat
Array.prototype.myConcat = function(...args) {
    const result = [...this];
    for (const item of args) {
        if (Array.isArray(item)) {
            result.push(...item);
        } else {
            result.push(item);
        }
    }
    return result;
};

// Test examples (uncomment to run):
// console.log(arr.myMap(x => x * 2));
// console.log(arr.myFilter(x => x > 2));
// console.log(arr.myReduce((acc, val) => acc + val, 0));


// 14. Pollyfill String.split();


String.prototype.mySplit = function(delimiter){
    const res = [];
    const string = this;
    if(delimiter === "") return Array.from(string);
    const startSplit = (str, i)=>{
        if(i>=string.length) return;
        const index = str.indexOf(delimiter);
        if(index>=0){
            res.push(str.substring(0,index))
            startSplit(str.substring(index + delimiter.length), index + delimiter.length)
        }else{
            res.push(str);
        }
    }
    startSplit(string, 0);
    return res;
}

console.log('the quick brown fox'.mySplit(" "));

