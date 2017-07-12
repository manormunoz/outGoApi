import { EmailTemplate } from 'email-templates';
import async from 'async';
import nodemailer from 'nodemailer';
import Promise from 'bluebird';
import path from 'path';

import { $email } from './config';


/**
 * Returns languages like string: 'es-MX|en-US'
 *
 * @returns {Promise} languages
 */

export default {
  send
};
/**
 * Send email
 * @param  {string}  to       Email
 * @param  {string}  subject  Email subject
 * @param  {string}  template Template name
 * @param  {Array}   data     Data
 * @return {Promise} Promise
 */
function send(to, subject, template, data) {

  return new Promise((resolve, reject) => {
    async.waterfall([
      (next) => {
        const engine = new EmailTemplate(path.join(__dirname, '../views/emails', template));
        engine.render(data, (err, result) => {
          if (err) {
            reject(err);
          }
          else {
            return next(null,result.html);
          }
        });
      },
      (html) => {
        resolve(html);
        const transporter = nodemailer.createTransport({
          host: $email().host,
          port: $email().port,
          secure: $email().secure,
          auth: {
            user: $email().user,
            pass: $email().pass
          },
          tls: {
            rejectUnauthorized:false
          }
        });
        const email = {
          from: $email().from,
          to: to,
          subject: subject,
          html: html
        };

        // verify connection configuration
        transporter.verify().then((success) => {
          transporter.sendMail(email);

          resolve('ok');

        }).catch(err => {
          reject(err);
        });
      }
    ]);
  });

}
