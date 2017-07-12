import { SevenBoom } from 'graphql-apollo-errors';

/**
 * Returns userNotFound message like SevenBoom: 'es-MX|en-US'
 * @param {object} __ i18n
 * @param {string} message custom message
 * @param {object} data data
 * @returns {SevenBoom} error
 */
export function userNotFound(__, message = null, data = []) {
  if (!message) {
    //Obtener desde 18n
  }
  return SevenBoom.notFound(message, data, 'USER_NOT_FOUND');
}

/**
 * Returns badLogin message like SevenBoom: 'es-MX|en-US'
 * @param {object} __ i18n
 * @param {string} message custom message
 * @param {object} data data
 * @returns {SevenBoom} error
 */
export function badLogin(__, message = null, data = []) {
  if (!message) {
    //Obtener desde 18n
    message = __.Users.authenticate.wrong;
  }
  return SevenBoom.badRequest(message, data, 'BAD_LOGIN');
}
