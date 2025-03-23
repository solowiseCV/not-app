const { Router } = require("express");
const noteRouter = require('./note.route');
const testmiddleware = require('../test.middleware');



Router.use('/notes', testmiddleware, noteRouter);

module.exports = Router;