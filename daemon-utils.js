// @ts-check
import { PassThrough } from 'node:stream'
import { errorLog, infoLog, prefixAllLines, stderrOutput, subprocessLog, successLog } from './log-utils.js'
import { execa } from 'execa'
import { path } from 'kubo'

const daemonStdoutTap = new PassThrough()
const daemonStderrTap = new PassThrough()

const daemonReadyRegex = /Daemon is ready/
const repoLockRegex = /someone else has the lock/

/**
 * Listen for "Daemon is ready" to indicate we're ready to start importing
 */
const textDecoder = new TextDecoder()
let isListening = false
daemonStdoutTap.on('data', (chunk) => {
  const decodedChunk = textDecoder.decode(chunk)
  if (daemonReadyRegex.test(decodedChunk)) {
    isListening = true
    successLog('Kubo daemon is ready')
  }
  // subprocessLog(`daemon stdout: ${decodedChunk}`)
  // prefix each line with "daemon stdout: "
  subprocessLog(prefixAllLines('daemon stdout: ', decodedChunk))
})
export const isDaemonReady = /** @type {Promise<void>} */(new Promise((resolve) => {
  const interval = setInterval(() => {
    if (isListening) {
      clearInterval(interval)
      resolve()
    }
  }, 500)
}))

daemonStderrTap.on('data', (chunk) => {
  const decodedChunk = textDecoder.decode(chunk)

  stderrOutput(prefixAllLines('daemon stderr: ', decodedChunk))
  if (repoLockRegex.test(decodedChunk)) {
    // fail because they have another kubo process running already.

    errorLog('You have another Kubo process running already. Please kill it and try again.')
    process.exit(1)
  }
})

/**
 *
 * @returns {import('execa').ExecaChildProcess}
 */
export function startDaemon() {
  infoLog('Starting up Kubo daemon...')
  const daemon = execa(path(), ['daemon']);
  daemon.stdout?.pipe(daemonStdoutTap)
  daemon.stderr?.pipe(daemonStderrTap)
  return daemon
}

export function killDaemon(daemon) {
  daemon.kill()
}
