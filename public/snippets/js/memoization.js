const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2,
  3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function memo (func) {
  let memoize = {};
  return (...args) => {
    let argKey = JSON.stringify(...args);
    if (memoize[argKey] === undefined) {
      memoize[argKey] = func(...args);
    }

    return memoize[argKey];
  }
}

function sumArray (arr) {
  return arr.reduce((a, c) => a + c, 0);
}

const start = new Date();
console.log('first result = ' + sumArray(arr));
console.log('first time spend = ' + (new Date() - start));

const start2 = new Date();
var res = memo(sumArray);
console.log('second result = ' + res(arr));
console.log('second time spend = ' + (new Date() - start2));
