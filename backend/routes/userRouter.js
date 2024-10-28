const express = require('express');
const usersController = require('../controllers/usersCtrl');
const isAuthenticated = require('../middlewares/isAuth');

const userRouter = express.Router();

userRouter.post('/register', usersController.register);
userRouter.post('/login', usersController.login);
userRouter.get('/profile', isAuthenticated, usersController.profile);
userRouter.put('/changePassword', isAuthenticated, usersController.changeUserPassword);
userRouter.put('/updateProfile', isAuthenticated, usersController.updateUserProfile);


module.exports = userRouter