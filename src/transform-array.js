const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('\'arr\' parameter must be an instance of the Array!');
  }
  
  const transformArr = [];
  let deleteNext = false;

  for (let i = 0; i < arr.length; i++) {
    if (deleteNext) {
      deleteNext = false;
      continue;
    }

    if (arr[i] === '--discard-next') {
      deleteNext = true;
      continue;
    } else if (arr[i] === '--discard-prev') {
      if (i - 1 >= 0 && arr[i - 2] !== '--discard-next') {
        transformArr.pop();
      }
      continue;
    } else if (arr[i] === '--double-next') {
      if (i + 1 < arr.length) {
        transformArr.push(arr[i + 1]);
      }
      continue;
    } else if (arr[i] === '--double-prev') {
      if (i - 1 >= 0 && arr[i - 2] !== '--discard-next') {
        transformArr.push(arr[i - 1]);
      }
      continue;
    }

    transformArr.push(arr[i]);
  }

  return transformArr;
  
}

module.exports = {
  transform
};
