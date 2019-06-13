/*
 * NOTE: Babel does not support extending built in classes, such as Error,
 * so we have to implement this in a hacky fashion.
 */
class DuplicateIdentifierError {
  constructor(message) {
    this.name = 'DuplicateIdentifierError';
    this.message = message;
    this.stack = new Error().stack;
  }
}

DuplicateIdentifierError.prototype = Object.create(Error.prototype);

module.exports = DuplicateIdentifierError;
