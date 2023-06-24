/**
 * @file machinesRouter.js
 * @desc This model defines the router for the machines API endpoints.
 * @version 1.0
 */

import express from "express";
import {
  getAllMachines,
  createMachine,
  getMachineById,
  updateMachine,
  deleteMachine,
} from "../controllers/machineController.js";

/**
 * @module machinesRouter
 * @desc Router for the machines API endpoints.
 * @memberof module:routes
 */
const machinesRouter = express.Router();

/**
 * @function GET /
 * @desc Retrieves all machines.
 * @memberof module:routes/machinesRouter
 * @param {object} req - Request object from Express.
 * @param {object} res - Response object from Express.
 */
machinesRouter.get("/", getAllMachines);

/**
 * @function POST /
 * @desc Creates a new machine.
 * @memberof module:routes/machinesRouter
 * @param {object} req - Request object from Express.
 * @param {object} res - Response object from Express.
 */
machinesRouter.post("/", createMachine);

/**
 * @function GET /:id
 * @desc Retrieves a machine by its ID.
 * @memberof module:routes/machinesRouter
 * @param {object} req - Request object from Express.
 * @param {object} res - Response object from Express.
 */
machinesRouter.get("/:id", getMachineById);

/**
 * @function PUT /:id
 * @desc Updates a machine by its ID.
 * @memberof module:routes/machinesRouter
 * @param {object} req - Request object from Express.
 * @param {object} res - Response object from Express.
 */
machinesRouter.put("/:id", updateMachine);

/**
 * @function DELETE /:id
 * @desc Deletes a machine by its ID.
 * @memberof module:routes/machinesRouter
 * @param {object} req - Request object from Express.
 * @param {object} res - Response object from Express.
 */
machinesRouter.delete("/:id", deleteMachine);

export default machinesRouter;
