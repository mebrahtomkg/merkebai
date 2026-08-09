import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AUTH_TOKEN_COOKIE_NAME, JWT_SECRET_KEY } from '@/config/general';
import { User } from '@/models';

interface AuthTokenBody {
  id: number;
}

const jwtVerifyAsync = (token: string) => {
  return new Promise<number>((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_KEY, async (error: any, decoded: any) => {
      if (error) {
        reject(error);
        return;
      }

      const userId = (decoded as AuthTokenBody).id;

      resolve(userId);
    });
  });
};

/**
 * Middleware to perform auth gracefully without showing errors.
 * Sets req.userId to the Authenticated user id.
 *
 * Other controllers and middlewares in the system can know if the user is loggedin by
 * checking the existance of userId property on req object.
 */
const performAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[AUTH_TOKEN_COOKIE_NAME];

    if (token) {
      let userId: number | undefined;
      try {
        userId = await jwtVerifyAsync(token);
      } catch (error) {
        console.error(error);
      }

      if (userId) {
        const user = await User.findByPk(userId);
        if (user) {
          req.userId = user.id;
        }
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default performAuth;
