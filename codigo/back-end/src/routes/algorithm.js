/*
  File: algorithmRouter.js
  Description: This file contains the router configuration for the algorithm API endpoints.
  It exports an Express Router instance that handles HTTP requests related to algorithms.

  Dependencies:
  - express: A minimal and flexible Node.js web application framework used for creating APIs.
  - Algorithm: A controller module that defines the logic for handling algorithm-related requests.
  - axios: A popular HTTP client library used for making HTTP requests.

  Export:
  - algorithmRouter: An instance of the Express Router class configured to handle algorithm routes.

  Routes:
  - POST /: The route for creating a new algorithm. It delegates the request to the Algorithm controller's 'post' method.

*/

import express from "express";
import Algorithm from "../controllers/algorithmController.js";
import axios from "axios";

// Create an instance of the Express Router class
const algorithmRouter = express.Router();

// Route: POST /
// Description: Create a new algorithm
// Controller: Algorithm.post
algorithmRouter.post("/", Algorithm.post);

// Export the configured algorithmRouter
export default algorithmRouter;
