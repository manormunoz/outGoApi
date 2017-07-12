// NPM Dependencies
import fs from 'fs';
import yaml from 'js-yaml';

// Local Dependencies
import env from './env';

/**
 * Config container
 */
let config;

/**
 * Returns the selected environment configuration
 *
 * @param {string} environment Forcing environment
 * @returns {object} Config
 */
export function $config(environment) {
  if (!config) {
    config = yaml.safeLoad(
      fs.readFileSync(`${__dirname}/../config/config.yml`, 'utf-8')
    );
  }

  return environment && config[environment] || config[env().name] || {};
}

/**
 * Returns baseUrl node
 *
 * @param {string} env Forcing environment
 * @returns {string} baseUrl
 */
export function $baseUrl(env) {
  return $config(env).baseUrl;
}

/**
 * Returns db node
 *
 * @param {string} env Forcing environment
 * @returns {object} db
 */
export function $db(env) {
  return $config(env).db;
}

/**
 * Returns languages node
 *
 * @param {string} env Forcing environment
 * @returns {object} languages
 */
export function $languages(env) {
  return $config(env).languages;
}

/**
 * Returns api node
 *
 * @param {string} env Forcing environment
 * @returns {object} api
 */
export function $api(env) {
  return $config(env).api;
}

/**
 * Returns security node
 *
 * @param {string} env Forcing environment
 * @returns {object} security
 */
export function $security(env) {
  return $config(env).security;
}

/**
 * Returns serverPort node
 *
 * @param {string} env Forcing environment
 * @returns {number} serverPort
 */
export function $serverPort(env) {
  return $config(env).serverPort;
}

/**
 * Returns session node
 *
 * @param {string} env Forcing environment
 * @returns {object} session
 */
export function $session(env) {
  return $config(env).session;
}

/**
 * Returns email node
 *
 * @param {string} env Forcing environment
 * @returns {object} email
 */
export function $email(env) {
  return $config(env).email;
}
