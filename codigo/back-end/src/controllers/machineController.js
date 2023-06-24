import machineService from '../services/machineServices.js';
/**
 * Creates a new machine.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to the created machine.
 * @throws {Error} - If an error occurs during the creation process.
 */
const createMachine = async (req, res, next) => {
  try {
    const newMachine = await machineService.create(req.body);
    res.status(201).json(newMachine);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves all machines.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to an array of machines.
 * @throws {Error} - If an error occurs while retrieving the machines.
 */
const getAllMachines = async (req, res, next) => {
  try {
    const machines = await machineService.getAll();
    res.json(machines);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a machine by its ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to the machine with the specified ID.
 * @throws {Error} - If an error occurs while retrieving the machine.
 */
const getMachineById = async (req, res, next) => {
  try {
    const machine = await machineService.getById(req.params.id);
    res.json(machine);
  } catch (error) {
    next(error);
  }
};

/**
 * Updates a machine by its ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to the updated machine.
 * @throws {Error} - If an error occurs while updating the machine.
 * 
 */
const updateMachine = async (req, res, next) => {
  try {
    const machine = await machineService.update(req.params.id, req.body);
    res.json(machine);
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a machine by its ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise} - A promise that resolves to the deleted machine.
 * @throws {Error} - If an error occurs while deleting the machine.
 */
const deleteMachine = async (req, res, next) => {
  try {
    const machine = await machineService.remove(req.params.id);
    res.json(machine);
  } catch (error) {
    next(error);
  }
};

export {
  getAllMachines,
  createMachine,
  getMachineById,
  updateMachine,
  deleteMachine,
}