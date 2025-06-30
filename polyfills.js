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

// - -- - -- -- --  -  Map -> MyMap

// Array.prototype.myMap= function(callback){
//     let result = [];

//     for(let i = 0 ; i < this.length ; i++){
//         result.push(callback(this[i], i, this))
//     }

//     return result;
// }

// const ans = arr.myMap((a)=>a*2);
// console.log(ans);

// -- - --- - -- - - - Filter - MyFilter

// Array.prototype.myFilter = function(callback){
//     let result = [];

//     for(let i = 0 ; i < this.length ; i++){
//         if(callback(this[i], i, this)){
//             result.push(this[i])
//         }
//     }

//     return result;
// }
// const ans = arr.myFilter((a)=>a>=3);
// console.log(ans);

// -- - - - - - - Reduce

// Array.prototype.myReduce = function(callback, initialValue){
//     let acc;
//     let startIndex;

//     if(initialValue !== undefined){
//         acc = initialValue;
//         startIndex = 0;
//     }else{
//         acc=this[0];
//         startIndex = 1;
//     }

//     for(let i=startIndex ; i < this.length ;i++){
//         acc = callback(acc, this[i]);
//     }

//     return acc;

// }
// const result = arr.myReduce((acc, val) => acc + val, 10);
// console.log(result); // 20

// --_____------- Flat

// const nArr = [1, [2, 3], 4, 5, [6, [7, 8, [9, 10]]]];

// Array.prototype.myFlat = function (depth) {
//   let result = [];
//   for (let i = 0; i < this.length; i++) {
//     if (Array.isArray(this[i]) && depth>0) {
//       result.push(...this[i].myFlat(depth-1));
//     } else {
//       result.push(this[i]);
//     }
//   }

//   return result;
// };

// const ans = nArr.myFlat(1);
// console.log(ans);

// ------------- For Each

// Array.prototype.myForEach = function(callback){
//     for(let i =0 ; i < this.length ; i++){
//         callback(this[i], i, this);
//     }
// }

// arr.forEach((a)=>console.log(a*3));

// -----Find ( return first element that staisfy the condition)

// Array.prototype.myFind = function(callback){
//     for(let i = 0 ; i < this.length ; i++){
//         if(callback(this[i], i, this)) return this[i];
//     }

//     return undefined;
// }

// const ans = arr.find((a)=>a%3===0);
// console.log(ans);

// ------- Bind

Array.prototype.myBind = function (context, ...args) {
  const fn = this;

  return function (...restArgs) {
    fn.apply(context, [...args, ...restArgs]);
  };
};

// ------ Promis.all

const pArr = [
  Promise.resolve("FIRST"),
  new Promise((res) => setTimeout(() => res("SECOND"), 3000)),
  Promise.resolve("THIRD"),
    Promise.reject("FOURTH"),
];

// Promise.all(pArr)
//   .then((result) => console.log(result))
//   .catch((error) => console.log("Error:", error));

// function myPromiseAll(pArr) {
//   let result = [];
//   let completed = 0;
//   return new Promise((resolve, reject) => {

//     if (pArr.length === 0) return resolve([]);

//     for (let i = 0; i < pArr.length; i++) {
//       Promise.resolve(pArr[i])
//         .then((data) => {
//           completed++;
//           result[i] = data;
//           if (completed === pArr.length) {
//             resolve(result);
//           }
//         })
//         .catch((error) => reject(error));
//     }
//   });
// }

// -------- Promise.Race

// function myPromiseRace(pArr){

//     return new Promise((resolve, reject)=>{
//         for(let i=0;i < pArr.length ;i++){
//         Promise.resolve(pArr[i]).then((data)=>resolve(data)).catch((error)=>reject(error));
//     }
//     })
// }

// myPromiseRace(pArr)
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));


// -------- Promise.allSettel

function myPromiseAllSettled(pArr){
  const result  = [];
  let allsettled = 0;
  return new Promise((resolve, reject)=>{
    for(let i = 0; i < pArr.length ; i++){
      Promise.resolve(pArr[i]).then((data)=>(
        result[i] = {
          status:'fulfilled',
          value:data
        }
      )
      ).catch(err=>{
        result[i]={
          status:'rejected',
          reason:err
        }
      }).finally(()=>{
                allsettled++
        if(allsettled === pArr.length){
          resolve(result);
        }
      })
    }
  })
}


myPromiseAllSettled(pArr).then((d)=>console.log(d));

// Promise.allSettled(pArr).then((result)=>console.log(result)).catch((er)=>console.log(er));
