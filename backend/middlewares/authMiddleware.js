const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const { getUserById } = require('../repositories/userRepository');

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.jwt;
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    try {
        // 1. verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 2. get user from DB
        const user = await getUserById(decoded.userId);
        if (!user) {
            res.status(401);
            throw new Error('User not found');
        }

        // 3. attach user to request (remove password manually)
        req.user = {
            id: user._id || user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        };

        next();

    } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
});

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
}
module.exports = { protect ,admin};