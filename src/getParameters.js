const { get, isObject } = require('deep-object-js');
const { getBody } = require('./getBody');

const _validateParams = (event, arg) => {
  if (!isObject(event)) throw new Error('Event is not an object');
  else if (!arg) throw new Error('Arg is not defined');
  else if (typeof arg != 'string') throw new Error('Arg is not a string');
}

const _get = (object, arg) => {
  let value = null;
  try {
    
    return get(object, arg) ||
      get(object, arg.toLowerCase()) || 
      get(object, arg.toUpperCase()) || 
      value;

  } catch (err) {
    return value;
  }
}

/**
 * Busca um argumento no objeto Lambda event nas propriedades headers, pathParameters e queryStringParameters recebido de uma requisição HTTP
 * 
 * @requires {object} event Lambda event
 * @requires {string} arg Valor a ser buscado
 * 
 * @example
 * const myLambda = (event, context, callback) => {
 *  / const a = getParameters(event, 'myArg');
 * }
 * 
 */

const getParameters = (event, arg, defaultValue = null) => {
  try {
    _validateParams(event, arg);

    const { headers, pathParameters, queryStringParameters } = event;
    const body = getBody(event);

    return _get(headers, arg) || _get(body, arg) || _get(queryStringParameters, arg) || _get(pathParameters, arg) || defaultValue;
  } catch (err) {
    return defaultValue;
  }
}

module.exports = { 
  getParameters,
  _get,
  _validateParams
};