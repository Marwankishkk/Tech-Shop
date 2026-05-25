const express = require('express');

const router = express.Router();

const { protect,admin } = require('../middlewares/authMiddleware');

const { registerUserController,
    loginUserController,
    logoutUserContoller,
    getUserProfileController,
    updateUserProfileController,
    getAllUsersController,
    deleteUserController,
    getUserByIdController } = require('../controllers/userController');

router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.post('/logout', logoutUserContoller);
router
  .route('/profile')
  .get(protect, getUserProfileController)
  .put(protect, updateUserProfileController);

router.get('/',protect,admin,getAllUsersController);
router.route('/:id')
    .get(protect,admin,getUserByIdController).delete(protect,admin,deleteUserController);
module.exports = router;

