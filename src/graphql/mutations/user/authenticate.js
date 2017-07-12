import {
  GraphQLNonNull
} from 'graphql';

import { Promise } from 'bluebird';

import { badLogin } from '../../../lib/errors/user';

import { userTokenType, userLoginType } from '../../types/user';

import User from '../../../models/user';

import { getToken } from '../../../lib/user';

export default {
  type: userTokenType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userLoginType)
    }
  },
  resolve(root, params, { __ }) {
    return new Promise((resolve, reject) => {
      User.findOne({
        email: params.data.email
      }).exec().then((user) => {
        if (!user) {
          reject(badLogin(__));
        }
        else {
          user.comparePassword(params.data.password, (err, isMatch) => {
            if (isMatch && !err) {
              const token = getToken(user);
              resolve({ token: token });
            }
            else {
              reject(badLogin(__));
            }
          });
        }
      }).catch((err) => {
        reject(badLogin(__, err));
      });
    });
  }
};
