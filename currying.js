// // Currying Implementation - transforms multi-argument function into sequence of single-argument functions

// function add(a) {
//   return function (b) {
//     if (b !== undefined) {
//       return add(a + b);
//     }
//     return a;
//   };
// }

// // version 2 without undefined add(1)(2)(3)(4)

// function add(x) {
//   let sum = x;
//   function inner(y) {
//     sum += y;
//     return inner;
//   }

//   inner.toString = function () {
//     return sum;
//   };

//   inner.valueOf = function () {
//     return sum;
//   };

//   return inner;
// }

// console.log(add(1)(2)(3)(4).toString());

// console.log(add(1)(2)(3)()); // Output: 6

// // Arrow function version - more concise
// const addArrow = (a) => (b) => b !== undefined ? addArrow(a + b) : a;

// console.log(addArrow(5)(10)(15)()); // Output: 30
 

const Args = 5;
const sum = (...args) => {
  if(args.length >= Args){
    return args.slice(0, Args).reduce((a,b)=>a+b,0)
  }

  return (...nextArgs)=>sum(...args, ...nextArgs)
};


const sum2 = (...args) => {
  const inner = (...nextArgs) => sum(...args, ...nextArgs);

  inner.result = () => args.reduce((acc, val) => acc + val, 0);

  return inner;
};

// sum().result();

console.log(sum(1, 2, 3, 4, 5));        // 15
console.log(sum(1, 2, 3, 4)(5));        // 15
console.log(sum(1)(2)(3)(4)(5));        // 15
console.log(sum(1, 2, 3)(4, 5));        // 15
console.log(sum(1)(2, 3, 4, 5));        // 15


const sum3 = (...args) => {
  const inner = (...nextArgs) => {
    if (nextArgs.length === 0) {
      return args.reduce((a, b) => a + b, 0); // auto-evaluate on empty call
    }
    return sum(...args, ...nextArgs);
  };

  inner.valueOf = () => args.reduce((a, b) => a + b, 0);
  inner.toString = () => inner.valueOf();

  return inner;
};

// console.log(sum(1)(2)(3)(4)(5));     // function, unless coerced
// console.log(+sum(1)(2)(3)(4)(5));    // 15
// console.log(sum(1)(2,3,4,5)());      // 15 (auto-eval via empty call)



const curryFun = ()=>{
  let prevSum = 0;
  return (nextSum = 0)=>{
    prevSum+=nextSum;
    return prevSum;
  }
}

const currySum = curryFun();
console.log(currySum(3));
console.log(currySum(4));
console.log(currySum(6));
console.log(currySum(5));
console.log(currySum());