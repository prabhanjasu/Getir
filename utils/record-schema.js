const Joi = require('joi');

const recordSchema = {
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    minCount: Joi.number().required(),
    maxCount: Joi.number().required()
};

exports.validateTask = (record) => Joi.validate(record, recordSchema);
