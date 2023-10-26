// @ts-check

import { errorLog } from './log-utils.js';

// get input filename from command line first arg
export const inputFile = process.argv[2];

if (!inputFile) {
  errorLog('Please provide a file with CIDs to import. e.g. `npx -y https://gist.github.com/SgtPooki/54d48f495e32387d38ab21863281d0dc ./test.txt`')
  process.exit(1)
}

/**
 * Allow setting a timeout value in milliseconds to kill the daemon after a certain amount of time.
 */
export const timeoutMs = process.argv[3] ? parseInt(process.argv[3]) : null
