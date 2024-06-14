import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (req.headers.authorization && !token) {
      throw new AppError(401, 'Bearer before token is expected');
    }

    // checking if the token is missing
    if (!token) {
      throw new AppError(401, 'You have no access to this route');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(404, 'You have no access to this route');
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You have no access to this route');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
