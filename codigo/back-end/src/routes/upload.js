/**
 * @file uploadRouter.js
 * @desc This module defines the upload router for handling file uploads.
 * @requires express
 * @requires ../controllers/uploadController.js
 * @requires multer
 * @requires ../services/uploadServices.js
 */

import express from "express";
import Upload from "../controllers/uploadController.js";
import multer from "multer";
import uploadServices from "../services/uploadServices.js";

/**
 * Multer storage configuration for file uploads.
 * @type {Object}
 * @memberof module:uploadRouter.js
 * @inner
 */
const upload = multer({ storage: uploadServices.storageMulter() });

/**
 * Express router for handling file upload routes.
 * @type {Object}
 * @memberof module:uploadRouter.js
 * @inner
 */
const uploadRouter = express.Router();

/**
 * POST route for file upload.
 * @name POST /
 * @function
 * @memberof module:uploadRouter.js
 * @inner
 * @param {string} path - The URL path for the route ("/").
 * @param {function} middleware - Middleware for handling the uploaded file.
 * @param {function} handler - Request handler for processing the uploaded file.
 */
uploadRouter.post("/", upload.single('file'), Upload.post);

export default uploadRouter;
