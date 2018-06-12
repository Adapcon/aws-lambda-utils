const { isObject } = require('deep-object-js');

const _validateParams = (event) => {
  if (!isObject(event)) throw new Error('Event is not an object');
}

/**
 * Faz o parse do Body de uma requisição se existir no event, caso seja necessário.
 * 
 * @requires {object} event Lambda event
 * 
 * @example
 * const myLambda = (event, context, callback) => {
 *  / event = undefined;
 *  / let body = getBody(event, {}); // -> {}  
 *  / body = getBody(event); // -> null
 * }
 * 
 */

const getBody = (event, defaultValue = null) => {
  try {
    _validateParams(event);
    if (typeof event.body === 'string') return JSON.parse(event.body);
    
    if (!isObject(event.body)) return defaultValue;

    return event.body;
  } catch (err) {
    return defaultValue;
  }
}

module.exports = {
  getBody,
  _validateParams
};