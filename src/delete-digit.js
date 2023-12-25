const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const str = n.toString();
  let maxNum = 0;

  for (let i = 0; i < str.length; i += 1) {
    const arr = str.split('');
    arr.splice(i, 1);
    const newNum = parseInt(arr.join(''));
    maxNum = Math.max(maxNum, newNum);
  }

  return maxNum;
}

module.exports = {
  deleteDigit
};
