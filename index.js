#!/usr/bin/env node
// @ts-check
import { isDaemonReady, killDaemon, startDaemon } from './daemon-utils.js';
import { inputFile, timeoutMs } from './argv.js'
import { readAllCIDsFromFile } from './file-utils.js'
import { importCID, makeImportDir } from './mfs-utils.js';
import { infoLog, successLog } from './log-utils.js';

let timeoutId = null
function gracefulShutdown(daemon) {
  infoLog('Shutting down...')
  if (timeoutId != null) {
    clearTimeout(timeoutId)
  }
  killDaemon(daemon)
  process.exit(1)
}

async function main() {
  const daemon = startDaemon()
  if (timeoutMs != null) {
    timeoutId = setTimeout(() => gracefulShutdown(daemon), timeoutMs)
  }
  process.on('beforeExit', () => gracefulShutdown(daemon))

  const [daemonIsReady, cidsWithName] = await Promise.all([
    isDaemonReady,
    readAllCIDsFromFile(inputFile),
  ])

  const mfsDirName = await makeImportDir()

  await Promise.all(cidsWithName.map(({name, cid}) => {
    return importCID(cid, name, mfsDirName)
  }))
  successLog(`Imported all CIDs from "${inputFile}" to MFS folder "/${mfsDirName}"`)
  gracefulShutdown(daemon)
}

await main()
