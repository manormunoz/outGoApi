import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import { Promise } from 'bluebird';

import { userNotFound } from '../../../lib/errors/user';
import { userType } from '../../types/user';
import userModel from '../../../models/user';

export default {
  type: userType,
  args: {
    id: {
      name: 'ID',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, { __ }) {
    return new Promise((resolve, reject) => {
      userModel.findById(params.id).exec().then((user) => {
        resolve(user);
      }).catch((err) => {
        const errorMessage = `User with id: ${params.id} not found`;
        const errorData = { userId: params.id };
        reject(userNotFound(errorMessage, errorData));
      });
    });
  }
};
