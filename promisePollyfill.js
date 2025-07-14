// pollyfill of promise.all

function myPromiseAll(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Argument must be an array');
    }

    if (arr.length === 0) {
        return Promise.resolve([]);
    }

    return new Promise((resolve, reject) => {
        let result = [];
        let completed = 0;

        arr.forEach((promise, i) => {
            Promise.resolve(promise)
                .then(res => {
                    result[i] = res;
                    completed++;
                    if (completed === arr.length) {
                        resolve(result);
                    }
                })
                .catch(reject);
        });
    });
}

// pollyfill for promise.race

function myPromiseRace(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Argument must be an array');
    }

    return new Promise((resolve, reject) => {
        for (const pr of arr) {
            Promise.resolve(pr).then(resolve).catch(reject);
        }
    });
}



// pollyfill for promise.allSettled


function myPromiseAllSettled(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Argument must be an array');
    }

    if (arr.length === 0) {
        return Promise.resolve([]);
    }

    return new Promise((resolve) => {
        const result = [];
        let settledCount = 0;

        arr.forEach((promise, i) => {
            Promise.resolve(promise)
                .then(value => {
                    result[i] = { status: 'fulfilled', value };
                })
                .catch(reason => {
                    result[i] = { status: 'rejected', reason };
                })
                .finally(() => {
                    settledCount++;
                    if (settledCount === arr.length) {
                        resolve(result);
                    }
                });
        });
    });
}


// pollyfill for promise.any

function myPromiseAny(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError("Argument must be an array");
    }

    if (arr.length === 0) {
        return Promise.reject(new AggregateError([], "All promises were rejected"));
    }

    return new Promise((resolve, reject) => {
        let rejections = [];
        let rejectedCount = 0;

        arr.forEach((promise, i) => {
            Promise.resolve(promise)
                .then(resolve)
                .catch(error => {
                    rejections[i] = error;
                    rejectedCount++;
                    if (rejectedCount === arr.length) {
                        reject(new AggregateError(rejections, "All promises were rejected"));
                    }
                });
        });
    });
}

