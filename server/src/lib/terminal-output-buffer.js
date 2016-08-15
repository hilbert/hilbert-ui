const Writable = require('stream').Writable;

export default class TerminalOutputBuffer extends Writable {

  constructor(options) {
    super(options);

    this.lines = [];
  }

  /**
   * Private handler for Writable stream
   * @param chunk
   * @param encoding
   * @param callback
   * @private
   */
  _write(chunk, encoding, callback) {
    this.lines.push({
      time: Date.now(),
      data: chunk.toString(),
    });

    if (this.lines.length > TerminalOutputBuffer.DEFAULT_MAX_LINES) {
      this.lines.splice(0, this.lines.length - TerminalOutputBuffer.DEFAULT_MAX_LINES);
    }
    callback();
  }

  /**
   * Returns the full output in the buffer
   * @returns {string}
   */
  getAll() {
    return this.getSince(0);
  }

  /**
   * Returns the output in the buffer since a certain time
   * @param {int} aTime - Timestamp
   * @returns {string}
   */
  getSince(aTime) {
    const data = [];
    for (const lineData of this.lines) {
      if (lineData.time > aTime) {
        data.push(lineData.data);
      }
    }

    return data;
  }
}

TerminalOutputBuffer.DEFAULT_MAX_LINES = 80;
