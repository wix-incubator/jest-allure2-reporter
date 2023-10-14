const ALLURE_PRESET = process.env.ALLURE_PRESET ?? 'default';

module.exports = require(`./configs/${ALLURE_PRESET}`);
