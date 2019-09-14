import gravatar = require('gravatar');
import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
import {validateRegisterInput} from '../../auth/register';
import {validateLoginInput} from '../../auth/login';

import {IResponse} from '../../typings/IResponse';
import {User} from '../../models/User';
import {IUser} from '../../typings/auth/IUser';
import {authConfig} from '../../config/config';

class AuthController {
  // constructor() {}

  public async signup(user: IUser): Promise<IResponse> {
    const {name, email, password} = user;

    if (email === undefined || password === undefined) {
      return {success: false, status: 400};
    }

    try {
      const {errors, isValid} = validateRegisterInput(user);

      if (!isValid) {
        throw new Error('Validate Fail!');
      }

      const result = await User.findOne({email});
      if (result) {
        return {
          success: false,
          status: 400,
          message: 'Email already exists',
          data: {email: 'Email already exists'},
        };
      } else {
        const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        });
        const newUser = new User({
          name: name ? name : '',
          email,
          password,
          avatar,
        });

        const salt = await bcrypt.genSalt(10);
        if (!salt) {
          throw new Error('getSalt Error!');
        }

        const hash = await bcrypt.hash(newUser.password, salt);
        if (!hash) {
          throw new Error('hash Error!');
        }

        newUser.password = hash;
        const newUserSave = await newUser.save();
        return {
          status: 200,
          success: true,
          message: 'Success Register!',
          data: newUserSave,
        };
      }
    } catch (err) {
      return {success: false, status: 500};
    }
  }

  public async signin(user: IUser): Promise<IResponse> {
    const {email, password} = user;

    if (email === undefined || password === undefined) {
      return {success: false, status: 400};
    }

    try {
      const {errors, isValid} = validateLoginInput(user);

      if (!isValid) {
        throw new Error('Validate Fail!');
      }

      const result = await User.findOne({email});
      if (!result) {
        return {success: false, status: 500, message: 'User not found'};
      }

      const isMatch = await bcrypt.compare(password, result.password);
      if (isMatch) {
        const payload = {
          id: result.id,
          name: result.name,
          avatar: result.avatar,
        };
        const token = jwt.sign(payload, authConfig.secretKey, {
          expiresIn: 3600,
        });

        return {success: true, status: 200, token: `Bearer ${token}`};
      } else {
        errors.password = 'Incorrect Password';
        return {
          success: false,
          status: 500,
          message: 'Incorrect Password',
          data: errors,
        };
      }
    } catch (err) {
      return {success: false, status: 500};
    }
  }
}

export default new AuthController();
