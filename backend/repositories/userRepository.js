const { get } = require('lodash');
const User = require('../models/userModel');

const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
}
const getUserByEmail = async (email) => {
    const user = User.findOne({ email });
    return await user;
}
const getUserById = async (id) => {
    const user = User.findById(id);
    return await user;
}
const findByIdAndUpdate = async (id, updateData) => {
    const updatedUser = await User.findByIdAndUpdate(
        id,
        {
            name: updateData.name?.trim(),
            email: updateData.email?.toLowerCase()?.trim(),
        },
        {
            new: true,
            runValidators: true,
        }
    );
    return updatedUser;
}
const getAllUsers = async () => {
    const users = await User.find({});
    return users;
}
const findByIdAndDelete = async (id) => {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
}
module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    findByIdAndUpdate,
    getAllUsers,
    findByIdAndDelete
}