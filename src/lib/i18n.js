//NPM Dependencies
import acceptLanguage from 'accept-language';

// Local Dependencies


// Configuration
import { $languages } from './config';

/**
 * Returns languages like string: 'es-MX|en-US'
 *
 * @returns {string} languages
 */
export function availableLanguages() {
  return $languages().list.join('|');
}

/**
 * Returns languages like array: '[es-MX,en-US]'
 *
 * @returns {string} languages
 */
export function availableLanguagesAsArray() {
  return $languages().list;
}

/**
 * Returns default language
 *
 * @returns {string} Default language
 */
export function defaultLanguage() {
  return $languages().default;
}

/**
 * Returns current language from accept-language header
 *
 * @param {string} acceptLanguageHeader current accept-language header
 * @returns {string} Current language (es-MX)
 */
export function getCurrentLanguage(acceptLanguageHeader) {
  acceptLanguage.languages(availableLanguagesAsArray());
  const currentLanguage = acceptLanguage.get(acceptLanguageHeader);
  return isLanguage(currentLanguage) ? currentLanguage : defaultLanguage();
}

/**
 * Checks if a given string is a valid language
 *
 * @param {string} lang Language
 * @returns {boolean} Returns true if is a valid language
 */
export function isLanguage(lang) {
  const currentLanguage = $languages().list.filter(language => {
    return language === lang;
  });

  return currentLanguage.length > 0;
}

/**
 * Loads a language json file
 *
 * @param {string} language Language
 * @returns {object} Language json
 */
export function loadLanguage(language) {
  let content;
  if (isLanguage(language)) {
    try {
      content = require(`../content/i18n/${language}`);
    }
    catch (e) {
      content = require(`../content/i18n/${defaultLanguage()}`);
    }
  }
  else {
    content = require(`../content/i18n/${defaultLanguage()}`);
  }

  return content;
}
