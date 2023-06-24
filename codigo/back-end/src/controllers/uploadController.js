/**
 * Represents the Upload class.
 * This class provides functionality for handling file uploads and responding with the original filename.
 */
class Upload {
    /**
     * Handles the POST request for file upload.
     *
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     */
    static post(req, res) {
      // Retrieve the original filename from the uploaded file
      const name = req.file.originalname;
  
      // Send a JSON response containing the original filename
      res.json({ name });
    }
  }
  
  export default Upload;
  