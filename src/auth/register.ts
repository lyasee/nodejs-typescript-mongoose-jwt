import Validator from 'validator';
import {isEmpty} from './isEmpty';

interface IError {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

export const validateRegisterInput = (data: any) => {
  const errors: IError = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.passwordConfirm = !isEmpty(data.passwordConfirm)
    ? data.passwordConfirm
    : '';

  if (!Validator.isLength(data.name, {min: 2, max: 30})) {
    errors.name = 'Name must be between 2 to 30 chars';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (!Validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = 'Password must have 6 chars';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  if (!Validator.isLength(data.passwordConfirm, {min: 6, max: 30})) {
    errors.passwordConfirm = 'Password must have 6 chars';
  }

  if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = 'Password and Confirm Password must match';
  }

  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
