// backend/src/middleware/authorize.js
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Forbidden: User role (${req.user ? req.user.role : 'none'}) is not authorized to access this resource.` });
        }
        next();
    };
};

export default authorize;