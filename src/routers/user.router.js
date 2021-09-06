const {Router} = require('express');

const router = Router();

const {isAuthenticated} = require('../helpers/auth');

const {
    addNewUser,
    renderAllUsers,
    renderNewUser,
    renderEditUser,
    updateUser,
    deleteUser
} = require('../controllers/user.controller');

router.get('/user/user', isAuthenticated, renderAllUsers);

router.get('/user/addUser', isAuthenticated, renderNewUser);

router.post('/user/addUser', isAuthenticated, addNewUser);

router.get('/user/edit/:id', isAuthenticated, renderEditUser);

router.put('/user/update/:id', isAuthenticated, updateUser);

router.delete('/user/delete/:id', isAuthenticated, deleteUser);

module.exports = router;