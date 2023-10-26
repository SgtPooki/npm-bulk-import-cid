// @ts-check
import { execa } from 'execa';
import { path } from 'kubo';
import { infoLog, prefixAllLines, stderrOutput, subprocessLog, successLog } from './log-utils.js';

// make a directory using the current YYYY-MM-DD as the name
export async function makeImportDir() {
  const dateId = new Date().toISOString()
  const importFolderName = `@sgtpooki_bulk-import-cid:${dateId}`
  infoLog(`Creating import folder to host imported CIDs on MFS at path "/${importFolderName}"`)
  const {stderr, stdout} = await execa(path(), ['files', 'mkdir', `/${importFolderName}`]);

  if (stderr.length > 0) {
    stderrOutput(prefixAllLines('kubo files mkdir stderr: ', stderr))
    throw new Error(`kubo files mkdir stderr: ${stderr}`)
  }
  if (stdout.length > 0) {
    subprocessLog(prefixAllLines('kubo files mkdir stdout: ', stdout))
  }
  successLog(`Successfully created "/${importFolderName}"`)

  return importFolderName
}

export async function importCID(cid, name, folder) {
  const src = `/ipfs/${cid}`
  const dest = `/${folder}/${name}`
  infoLog(`Importing ${cid} with name "${name}" to "${dest}" on MFS`)
  const {stderr, stdout} = await execa(path(), ['files', 'cp', src, dest]);
  if (stderr.length > 0) {
    stderrOutput(prefixAllLines('kubo files cp stderr: ', stderr));
    throw new Error(`kubo files cp stderr: ${stderr}`)
  }
  if (stdout.length > 0) {
    subprocessLog(prefixAllLines('kubo files cp stdout: ', stdout))
  }
  successLog(`Created "${dest}" on MFS`)
}
