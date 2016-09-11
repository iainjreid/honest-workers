'use strict'

function createWorkerScript (fn) {
  // Ensure that "fn" is a function
  if (typeof fn !== 'function') {
    throw Error('Worker script must be a function')
  }

  let blob = new Blob([
    `self.onmessage = function () {
      return ${fn.toString()}
    }`
  ], { type: 'text/javascript' })

  return URL.createObjectURL(blob)
}

export { createWorkerScript }
