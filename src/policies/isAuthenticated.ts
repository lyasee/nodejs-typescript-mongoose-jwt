import * as passport from 'passport';
import {NextFunction} from 'connect';

export const isAuthenticated = (req: any, res: any, next: NextFunction) => {
  passport.authenticate('jwt', (err, user) => {
    if (err || !user) {
      res.status(403).send({
        success: false,
        status: 403,
        message: 'you do not have access to this resource',
      });
    } else {
      req.body.user = user;
      next();
    }
  })(req, res, next);
};
