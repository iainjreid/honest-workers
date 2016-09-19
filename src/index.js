'use strict'

// Dependencies
import { createWorkerScript } from './utils'

const _workers = new WeakMap()

/**
 * @description A module allowing developers to benefit from the wonderful Promise interface whilst enjoying the
 *              multi-threaded goodness provided by WebWorkers.
 */
class HonestWorkers {
  constructor () {
    _workers.set(this, {})
  }

  /**
   * @description This method will register a new function or task using the supplied UID, provided that that UID has
   *              not previously been used. For convenience, a reference to the newly registered item will be returned.
   *
   *              The function or task must adhere to the formatting in the example provided, and the UID must be a
   *              unique string (in the context of the HonestWorker instance).
   *
   * @example
   * honestWorkers.register('myTask', function (done) {
   *   // ... do something snazzy
   *
   *   done()
   * })
   *
   * @param {String}   uid - A unique name or identifier
   * @param {Function} fn  - A function with no lexical dependance
   *
   * @return {Function} A reference to the new congifuration object
   */
  register (uid, fn) {
    const workers = _workers.get(this)

    // Ensure that the UID provided has not previously been used
    if (workers[uid]) {
      throw Error('The UID must be unique')
    }

    workers[uid] = createWorkerScript(fn)
    _workers.set(this, workers)

    return workers[uid]
  }

  /**
   * @param {String} uid  - A unique name or identifier
   * @param {...Any} args - A list of arguements to be passed
   *
   * @return {Promise} A Promise dependant on the success of the task
   */
  execute (uid, ...args) {
    let worker

    // Ensure that the UID has been registered
    if (!(worker = _workers.get(this)[uid])) {
      throw Error('The UID has not been defined')
    }

    worker = new Worker(worker)

    return Promise((resolve, reject) => {
      worker.onmessage = (e) => {
        resolve(e.data)
      }

      worker.postMessage(args)
    })
  }

  /**
   * @return {Function} - A reference to the HonestWorkers class
   */
  get Class () {
    return HonestWorkers
  }
}

module.exports = new HonestWorkers();
