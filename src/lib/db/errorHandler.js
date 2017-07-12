//NPM dependecies
import __ from 'lodash';
import dot from 'dot-object';
import Promise from 'bluebird';
import format from 'string-format';

format.extend(String.prototype);
/**
 * Validates if the User Agent is a Mobile Browser
 *
 * @param {String} from from is called ex. 'Users.Register' must match with i18n file
 * @param {array} error mongoose error
 * @param {array} i18n i18n object
 * @returns {Object} Humanized error
 */
export function humanize(from, error, i18n) {
  return new Promise((resolve, reject) => {
    if (!error.errors) {
      resolve(new Error(error.message));
    }
    try {
      const errorHumanized = {};
      let c = 0;
      __.each(error.errors, (val, key) => {

        const kind = val.kind.replace(' ', '');

        dot.copy(`${from}.${key}.error.${kind}`, `${key}.message`, i18n, errorHumanized);

        if (!errorHumanized[key]) {
          const item = [];
          item[key] = { message: val.message };
          dot.copy(`${key}.message`, `${key}.message`, item, errorHumanized);
        }
        else {
          errorHumanized[key].message = errorHumanized[key].message.format(val.value);
        }
        if (c === Object.keys(error.errors).length - 1) {
          resolve(errorHumanized);
        }
        c++;

      });
    }
    catch (e) {
      reject(e.message);
    }

  });

}
