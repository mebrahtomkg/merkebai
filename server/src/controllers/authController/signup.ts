import { User } from '@/models';
import { Request, Response, NextFunction } from 'express';
import { filterUserData } from '@/utils';
import { signUpSchema } from '@/schemas';
import { createNewUser } from '@/services';
import { setLogInCookie } from './utils';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.userId) {
      res.status(400).json({
        message: 'You are already signedup',
      });
      return;
    }

    const parseResult = signUpSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: parseResult.error.issues[0].message,
      });
      return;
    }

    const { email } = parseResult.data;

    if (await User.findOne({ where: { email } })) {
      res.status(409).json({
        message: 'The eamil already exists.',
      });
      return;
    }

    const user = await createNewUser(parseResult.data);

    setLogInCookie(res, user.id);

    res.status(200).json({
      success: true,
      data: filterUserData(user.toJSON()),
      message: 'Signup successful',
    });
  } catch (err) {
    next(err);
  }
};

export default signup;
