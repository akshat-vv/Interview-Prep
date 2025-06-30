// polyfill -

// 1. Map
// 2. Filter
// 3. Reduce
// 4. Flat
// 5. some
// 6. every
// 7. find
// 8. bind

const arr = [1, 2, 3, 4];

// 1. Map -> myMap
Array.prototype.myMap = function (callback) {
  let result = [];

  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }

  return result;
};
// const ans = arr.myMap((a) => a * 2);
// console.log(ans);

// 2. Filter -> myFilter
Array.prototype.myFilter = function (callback) {
  let result = [];

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};
// const ans = arr.myFilter((a) => a >= 3);
// console.log(ans);

// 3. Reduce -> myReduce
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
// const result = arr.myReduce((acc, val) => acc + val, 10);
// console.log(result); // 20

// 4. Flat -> myFlat
const nArr = [1, [2, 3], 4, 5, [6, [7, 8, [9, 10]]]];

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
// const ans = nArr.myFlat(2);
// console.log(ans);

// 5. ForEach -> myForEach
Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};
// arr.myForEach((a) => console.log(a * 3));

// 6. Find -> myFind
Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) return this[i];
  }

  return undefined;
};
// const ans = arr.myFind((a) => a % 3 === 0);
// console.log(ans);

// 7. Some -> mySome
Array.prototype.mySome = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) return true;
  }

  return false;
};
// console.log(arr.mySome((a) => a > 3)); // true

// 8. Every -> myEvery
Array.prototype.myEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) return false;
  }

  return true;
};
// console.log(arr.myEvery((a) => a > 0)); // true

// 9. Bind -> myBind
Function.prototype.myBind = function (context, ...args) {
  const fn = this;

  return function (...restArgs) {
    return fn.apply(context, [...args, ...restArgs]);
  };
};

// Example:
// const person = { name: 'Akshat' };
// function greet(greeting) { console.log(`${greeting}, ${this.name}`); }
// const boundGreet = greet.myBind(person, 'Hello');
// boundGreet(); // Hello, Akshat

// 10. Promise.all -> myPromiseAll
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

// 11. Promise.race -> myPromiseRace
function myPromiseRace(pArr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < pArr.length; i++) {
      Promise.resolve(pArr[i])
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    }
  });
}

// 12. Promise.allSettled -> myPromiseAllSettled
function myPromiseAllSettled(pArr) {
  const result = [];
  let settledCount = 0;

  return new Promise((resolve) => {
    if (pArr.length === 0) return resolve([]);

    for (let i = 0; i < pArr.length; i++) {
      Promise.resolve(pArr[i])
        .then((value) => {
          result[i] = {
            status: 'fulfilled',
            value,
          };
        })
        .catch((reason) => {
          result[i] = {
            status: 'rejected',
            reason,
          };
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

// ✅ Sample for promises
const pArr = [
  Promise.resolve("FIRST"),
  new Promise((res) => setTimeout(() => res("SECOND"), 3000)),
  Promise.resolve("THIRD"),
  Promise.reject("FOURTH"),
];

// myPromiseAll(pArr).then(console.log).catch(console.error);
// myPromiseRace(pArr).then(console.log).catch(console.error);

myPromiseAllSettled(pArr).then((d) => console.log(d));

// Promise.allSettled(pArr).then(console.log).catch(console.error);
