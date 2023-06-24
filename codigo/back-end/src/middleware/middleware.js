/**
 * @class Middleware
 * @description Represents a middleware class used for handling CORS (Cross-Origin Resource Sharing).
 */
class Middleware {
    /**
     * @static
     * @function cors
     * @description Returns the CORS configuration object.
     * @returns {object} - The CORS configuration object.
     */
    static cors() {
      return {
        origin: ''
      };
    }
  }
  
  export default Middleware;
  