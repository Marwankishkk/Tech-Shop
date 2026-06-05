const { registerUserService, loginUserService ,getUserProfileService,updateProfileService,getAllUsersService,deleteUserService,getUserByIdService} = require('../services/userService');
const asyncHandler = require('../middlewares/asyncHandler');
const { generateToken } = require('../utils/auth');

const registerUserController = asyncHandler(async (req, res) => {
    const user = await registerUserService(req.body);
    if (!user) {
        res.status(400)
        throw new Error('User registration failed');
    }
    generateToken(res, user._id);

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
    });
});

const loginUserController = asyncHandler(async (req, res) => {
    const user = await loginUserService(req.body);
    if (!user) {
        res.status(400);
        throw new Error('Invalid email or password');
    };
    generateToken(res, user._id);
    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
    });

});
const logoutUserContoller = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({
        success: true,
        message: 'User logged out successfully',
    });
  };

  const getUserProfileController = asyncHandler(async (req, res) => {
    const user = await getUserProfileService(req.user);

   res.status(200).json({
        success: true,
        data: {
            name: user.name,
            email: user.email,
        },
    });
});
const updateUserProfileController = asyncHandler(async (req, res) => {
    const user = await updateProfileService(req.user.id, req.body);

    res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: {
            name: user.name,
            email: user.email,
        },
    });
});

const getAllUsersController = asyncHandler(async (req, res) => {
    const users = await getAllUsersService();
    res.status(200).json({
        success: true,
        data: users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
        })),
    });
})
const deleteUserController = asyncHandler(async (req, res) => {
    await deleteUserService(req.params.id);
    res.status(200).json({
        success: true,
        message: 'User deleted successfully',
    });
})
const getUserByIdController = asyncHandler(async (req, res) => {
    const user = await getUserByIdService(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    res.status(200).json({
        success: true,
        data: {
            name: user.name,
            email: user.email,
        },
    });
})
module.exports = {
    registerUserController,
    loginUserController,
    logoutUserContoller,
    getUserProfileController,
    updateUserProfileController,
    getAllUsersController,
    deleteUserController,
    getUserByIdController,
    
};