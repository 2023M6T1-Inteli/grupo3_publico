/**
 * Get the waste of a pattern.
 * 
 * @param {Object} data - The data object containing the patterns.
 * @returns {Object} - The data object containing the patterns and the waste.
 */
const algorithmService = {
    getWaste: async (data) => {
      const maxRollWidth = data.rollWidth;
      for (let i = 0; i < data.patterns.length; i++) {
        let sum = 0;
        for (let j = 0; j < data.patterns[i].length; j++) {
          sum += data.patterns[i][j];
        }
        if (sum < maxRollWidth) {
          data.patterns[i].push(maxRollWidth - sum);
        }
        else {
            data.patterns[i].push(0);
        }
      }
      return data;
    }
  };
  
  export default algorithmService;
