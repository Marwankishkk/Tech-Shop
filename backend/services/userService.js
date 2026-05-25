const { log } = require('console');
const { createUser ,getUserByEmail,getUserById,findByIdAndUpdate,getAllUsers,findByIdAndDelete} = require('../repositories/userRepository');

const registerUserService = async (userData) => {
    const { name, email, password } = userData;

    // 1. Validation
    if (!name || !email || !password) {
        const error = new Error('Please provide all required fields');
        error.statusCode = 400;
        throw error;
    }

    try {
        // 2. Normalize input
        const normalizedData = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password,
        };

        // 3. Create user
        const user = await createUser(normalizedData);
       
        // 4. Return safe response
        return user;

    } catch (error) {
        if (error.code === 11000) {
            const err = new Error('Email already exists');
            err.statusCode = 409;
            throw err;
        }

        const err = new Error('Error creating user');
        err.statusCode = 500;
        throw err;
    }
};

const loginUserService = async (userData) => {
    const { email, password } = userData;
    
         if (!email || !password) {
            const error = new Error('Please provide email and password');
            error.statusCode = 400;
            throw error;
        }
        // 1. Find user by email
        const user = await getUserByEmail(email);
        // 2. Compare password
        if (!user || !(await user.matchPassword(password))) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }
        return user;

}
const getUserProfileService = async (user) => {
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    return user;
};
const updateProfileService = async (userId, updateData) => {
    try {
        const updatedUser = await findByIdAndUpdate(
            userId,
            {
                name: updateData.name?.trim(),
                email: updateData.email?.toLowerCase()?.trim(),
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedUser) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        return updatedUser;

    } catch (error) {
        if (error.code === 11000) {
            const err = new Error('Email already exists');
            err.statusCode = 409;
            throw err;
        }

        const err = new Error('Error updating profile');
        err.statusCode = 500;
        throw err;
    }
};
// ADMIN Services

const getAllUsersService = async () => {
    try {
        const users = await getAllUsers();
        return users;
    } catch (error) {
        const err = new Error('Error fetching users');
        err.statusCode = 500;
        throw err;
    }
}
const deleteUserService = async (userId) => {
    try {
        const deletedUser = await findByIdAndDelete(userId);
        if (!deletedUser) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        return deletedUser;
    } catch (error) {
        const err = new Error('Error deleting user');
        err.statusCode = 500;
        throw err;
    }
}
const getUserByIdService = async (id) => {
    try {
        const user = await getUserById(id);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        return user;
    } catch (error) {
        const err = new Error('Error fetching user');
        err.statusCode = 500;
        throw err;
    }
}



module.exports = {
    registerUserService,
    loginUserService,
    getUserProfileService,
    updateProfileService,
    getAllUsersService,
    deleteUserService,
    getUserByIdService,
};