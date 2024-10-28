const express = require('express');
const isAuthenticated = require('../middlewares/isAuth');
const transactionController = require('../controllers/transactionCtrl');
const transactionRouter = express.Router();

transactionRouter.post('/create', isAuthenticated, transactionController.create);
transactionRouter.get('/list', isAuthenticated, transactionController.list);
transactionRouter.put('/update/:id', isAuthenticated, transactionController.update);
transactionRouter.delete('/delete/:id', isAuthenticated, transactionController.delete);


module.exports = transactionRouter