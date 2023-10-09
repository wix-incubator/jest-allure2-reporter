const PRESET = process.env.ALLURE_PRESET ?? 'default';

module.exports = require(`./configs/${PRESET}`);
