import * as passport from 'passport';
import {ExtractJwt, Strategy, VerifiedCallback} from 'passport-jwt';
import {authConfig} from '../config/config';
import {model, Document} from 'mongoose';
import {IUser} from '../typings/auth/IUser';
const User = model('users');
const opts = {
  jwtFromRequest: null,
  secretOrKey: null,
};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = authConfig.secretKey;

export const passportInit = (): void => {
  passport.use(
    new Strategy(opts, (jwtPayload: IUser, done: VerifiedCallback) => {
      User.findById(jwtPayload.id)
        .then((user?: Document & IUser) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err: Error) => console.error(err));
    })
  );
};
