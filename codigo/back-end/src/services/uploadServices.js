/**
 * This module provides a class for handling file uploads using multer.
 * @module uploadServices
 */

import multer from "multer";

/**
 * A class that provides methods for configuring file upload storage using multer.
 * @class
 */
class uploadServices {
  /**
   * Configures the disk storage for file uploads using multer.
   * @static
   * @function storageMulter
   * @returns {object} The multer disk storage configuration object.
   */
  static storageMulter() {
    return multer.diskStorage({
      /**
       * Sets the destination folder for storing uploaded files.
       * @callback destinationCallback
       * @param {object} req - The request object.
       * @param {object} file - The uploaded file object.
       * @param {function} cb - The callback function to invoke when the destination is set.
       */
      destination: function (req, file, cb) {
        cb(null, '../../planejador/target/classes/'); // Folder where the files will be stored
      },
      /**
       * Sets the filename for the uploaded file using its original name.
       * @callback filenameCallback
       * @param {object} req - The request object.
       * @param {object} file - The uploaded file object.
       * @param {function} cb - The callback function to invoke when the filename is set.
       */
      filename: function (req, file, cb) {
        const originalName = file.originalname; // Original name of the file
        cb(null, originalName); // Use the original name to save the file
      },
    });
  }
}

export default uploadServices;
