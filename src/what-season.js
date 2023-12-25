const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
function getSeason(date) {
  if (!date) {
    return 'Unable to determine the time of year!';
  }

  try {
    if (Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date)) {
      const month = date.getMonth() + 1; 

      if (month > 2 && month < 6) {
        return 'spring';
      } else if (month > 5 && month < 9) {
        return 'summer';
      } else if (month > 8 && month < 12) {
        return 'autumn';
      } else {
        return 'winter';
      }
    } else {
      throw new Error('Invalid date');
    }
  } catch (error) {
    throw new Error('Invalid date!');
  }
}

module.exports = {
  getSeason
};

