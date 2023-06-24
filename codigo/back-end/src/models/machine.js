/**
 * @fileoverview This module defines the Mongoose schema for the Machine collection and exports the Machine model.
 * @module machine
 * @requires mongoose
 */

import mongoose from "mongoose";

/**
 * Represents the Mongoose schema for the Machine collection.
 * @class
 */
const machineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  machineWidth: {
    type: Number,
    required: true,
  },
  coilsPerRun: {
    type: Number,
    required: true,
  },
  multipleRuns: {
    type: Boolean,
    required: true,
  },
  numberOfRuns: {
    type: Number,
    required: false,
  },
  minimumWidth: {
    type: Number,
    required: true,
  },
});

/**
 * Represents the Mongoose model for the Machine collection.
 * @class
 */
const Machine = mongoose.model('Machine', machineSchema);

/**
 * Retrieves the next available ID for a new machine document.
 * @async
 * @function getNextId
 * @returns {Promise<number>} The next available ID.
 */


export default Machine;
