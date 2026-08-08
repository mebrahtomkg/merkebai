import { Request, Response, NextFunction } from 'express';
import { setLogOutCookie } from './utils';

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    setLogOutCookie(res);

    res.status(200).json({
      success: true,
      message: 'Successfully logout',
    });
  } catch (err) {
    next(err);
  }
};

export default logout;
