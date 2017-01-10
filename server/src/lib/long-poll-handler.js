const Promise = require('bluebird');
const EventEmitter = require('events').EventEmitter;

/**
 * Manages Long Polling for a single HTTP API endpoint
 */
export default class LongPollHandler {

  /**
   * Constructor
   * @param timeoutSecs Long poll timeout (in seconds)
   */
  constructor(timeoutSecs = 15) {
    this.timeoutSecs = timeoutSecs;
    this.updateID = 1;

    this.events = new EventEmitter();

    this.updateEventEmitter = new EventEmitter();
    this.updateEventEmitter.setMaxListeners(100);
  }

  /**
   * Handles an http request using long polling
   *
   * Call this method upon receiving an http request. It returns a
   * promise that signals when the client can send the response.
   *
   * If the client is synced it the promise will resolve immediately.
   * If the client is out of sync the promise will resolve as soon as
   * the handler is signaled that there are updates, or will reject if
   * there is a time out (in which case the client can send an empty
   * response)
   **
   * @param req HTTP Request (express)
   * @param res HTTP Response (express)
   * @return {Promise}
   */
  handleRequest(req, res) {
    return new Promise((resolve, reject) => {
      // If the client is out of sync we can respond right away
      if (Number(req.query.lastUpdateID) !== this.updateID) {
        resolve(this.updateID);
      } else {
        // If the client is synced...

        let pollTimeout = null;
        // Respond when an update arrives (and clear the timeout)
        const updateHandler = () => {
          clearTimeout(pollTimeout);
          resolve(this.updateID);
        };
        this.updateEventEmitter.once('update', updateHandler);

        // Time out if no updates arrive (and remove the update handler)
        pollTimeout = setTimeout(() => {
          this.updateEventEmitter.removeListener('update', updateHandler);
          this.events.emit('timeout');
          reject(Error('Time out waiting for updates'));
        }, this.timeoutSecs * 1000);

        this.events.emit('wait');
      }
    });
  }

  /**
   * Signal the handler that the data associated with this endpoint updated
   *
   * The handler emits an internal event to wake all waiting requests.
   */
  signalUpdate() {
    this.updateID += 1;
    this.updateEventEmitter.emit('update');
  }
}
