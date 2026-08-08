import { setLogInCookie } from './utils';
import { User } from '@/models';
import { logInSchema } from '@/schemas';
import { filterUserData, verifyPassword } from '@/utils';
import { Request, Response, NextFunction } from 'express';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.userId) {
      res.status(400).json({
        message: 'You are already logged in',
      });
      return;
    }

    const parseResult = logInSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: parseResult.error.issues[0].message,
      });
      return;
    }

    const { email, password } = parseResult.data;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({
        message: 'Invalid credentials!',
      });
      return;
    }

    if (!(await verifyPassword(password, user.password))) {
      res.status(401).json({
        message: 'Invalid credentials!',
      });
      return;
    }

    setLogInCookie(res, user.id);

    res.status(200).json({
      success: true,
      data: filterUserData(user.toJSON()),
      message: 'Login successful',
    });
  } catch (err) {
    next(err);
  }
};

export default login;
