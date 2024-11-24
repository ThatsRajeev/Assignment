import Parameter from "../models/Parameter.js";
import xss from 'xss';

/**
 * Save new Parameter details
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const createParamter = async (req, res) => {
  const parameter = new Paramter(req.body);
  try {
    const doc = await parameter.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

/**
 * Fetch all parameter details
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const fetchAllParamater = async (req, res) => {
  try {
    const docs = await Parameter.find({});
    res.status(201).json(docs);
  } catch(err) {
    console.error(err);
    return res.status(400).send(err);
  }
}

/**
 * Fetch Parameter details by id
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const fetchParameterById = async (req, res) => {
  const { id } = req.params;

  try {
    const parameter = await Parameter.findById(id);
    res.status(200).json(parameter);
  } catch (err) {
    res.status(400).json(err);
  }
};

/**
 * Update Parameter details by id
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const updateParameter = async (req, res) => {
  const { id } = req.params;

  try {
    const parameter = await Parameter.findByIdAndUpdate(id, req.body, {new:true});
    res.status(200).json(parameter);
  } catch (err) {
    res.status(400).json(err);
  }
};

export { createParamter, fetchAllParamater, fetchParameterById, updateParameter }
