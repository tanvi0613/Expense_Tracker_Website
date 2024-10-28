const express = require('express');
const isAuthenticated = require('../middlewares/isAuth');
const categoryController = require('../controllers/categoryCtrl');
const categoryRouter = express.Router();

categoryRouter.post('/create', isAuthenticated, categoryController.create);
categoryRouter.get('/list', isAuthenticated, categoryController.list);
categoryRouter.put('/update/:id', isAuthenticated, categoryController.update);
categoryRouter.delete('/delete/:id', isAuthenticated, categoryController.delete);


module.exports = categoryRouter