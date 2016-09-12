'use strict'

function createWorkerScript (fn) {
  // Ensure that "fn" is a function
  if (typeof fn !== 'function') {
    throw Error('Worker script must be a function')
  }

  let blob = new Blob([
    `self.onmessage = function (e) {
      e.data[e.data.length] = postMessage
      return (${fn.toString()}).apply(this, e.data)
    }`
  ], { type: 'application/javascript' })

  return URL.createObjectURL(blob)
}

export { createWorkerScript }
