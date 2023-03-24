/*
Provide 3 unique implementations 

**Input**: `n` - any integer 

*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

*/

var sum_to_n_a = function (n) {
  //for loop
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_b = function (n) {
  // recursion
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function (n) {
  //  formula for the sum
  return (n * (n + 1)) / 2;
};

console.log("method 1:" + sum_to_n_a(5));
console.log("method 2:" + sum_to_n_b(5));
console.log("method 3:" + sum_to_n_c(5));
