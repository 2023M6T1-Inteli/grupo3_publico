import Machine from '../models/machine.js';

/**
 * Creates a new machine.
 * 
 * @param {Object} machine - The machine object to be created.
 * @returns {Promise} - A promise that resolves to the created machine.
 * @throws {Error} - If an error occurs during the creation process.
 */
const create = async(machine) => {
    try {
        return await Machine.create(machine);
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieves all machines.
 * 
 * @returns {Promise} - A promise that resolves to an array of machines.
 * @throws {Error} - If an error occurs while retrieving the machines.
 */
const getAll = async() => {
    try {
        return await Machine.find();
    } catch (error) {
        throw error;
    }
}

/**
 * Retrieves a machine by its ID.
 * 
 * @param {Number} id - The id of the machine.
 * @returns {Promise} - A promise that resolves to the machine with the specified ID.
 * @throws {Error} - If an error occurs while retrieving the machine.
 */
const getById = async(id) => {
    try {
        return await Machine.findById(id);
    }
    catch (error) {
        throw error;
    }
}

/**
 * Updates a machine by its ID.
 * 
 * @param {Number} id - The id of the machine.
 * @param {Object} machine - The machine object to be updated.
 * @returns {Promise} - A promise that resolves to the updated machine.
 * @throws {Error} - If an error occurs while updating the machine.
 */
const update = async(id, machine) => {
    try{
        return await Machine.findByIdAndUpdate(id, machine, {new: true});
    }
    catch (error) {
        throw error;
    }
}

/**
 * Deletes a machine by its ID.
 * 
 * @param {Number} id - The id of the machine.
 * @returns {Promise} - A promise that resolves to the deleted machine.
 * @throws {Error} - If an error occurs while deleting the machine.
 */
const remove = async(id) => {
    try{
        return await Machine.findByIdAndDelete(id);
    }
    catch (error) {
        throw error;
    }
}

export default {
    create,
    getAll,
    getById,
    update,
    remove,
}