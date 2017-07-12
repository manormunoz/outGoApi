import jwt from 'jwt-simple';
import Promise from 'bluebird';
// Local Dependencies

import { $security } from './config';

// Model
import User from '../models/user';
/**
 * Create an object with only id and time
 *
 * @param {Object} user User
 * @returns {Object} User
 */
export function getToken(user) {
  const _user = {
    _id: new Buffer(user._id.toString()).toString('base64'),
    _t: new Date().getTime(),
    expire: new Date().getTime()
  };
  return jwt.encode(_user, $security().secret);
}

/**
 * Create an object with only id and time
 *
 * @param {string} token token
 * @returns {Object} User
 */
export function getUserFomToken(token) {
  try {
    const _user = jwt.decode(token, $security().secret);
    return User.findById(new Buffer(_user._id.toString(), 'base64').toString('ascii')).exec();
  }
  catch (e) {
    return new Promise((resolve, reject) => {
      reject(Error('Something wrong'));
    });
  }
  /*
  getUserFomToken(token).then((user) => {
    return res.json({success: true, message: res.__.Users.authenticate.success, token: `JWT ${token}`});

  })
  .catch((err) => {
    return res.status(403).send({success: err.message, message: res.__.Users.authenticate.invalidtoken});
  });
  */
}


