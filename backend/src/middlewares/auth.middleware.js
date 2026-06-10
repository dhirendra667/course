import { verifyToken } from '../utils/jwt.utils.js';
import User from '../models/user.model.js';
import AppError from '../utils/appError.js';

export const isLoggedIn = async (req, _res, next) => {
  try {
    // Get token from cookie or Authorization header
    let token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (!token) {
      return next(new AppError('You are not logged in. Please sign in to continue.', 401));
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('User no longer exists.', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRoles = (...roles) => {
  return (req, _res, next) => {
    if (!roles.includes(req.user?.role)) {
      return next(
        new AppError(`Role '${req.user?.role}' is not authorized to access this route.`, 403)
      );
    }
    next();
  };
};
