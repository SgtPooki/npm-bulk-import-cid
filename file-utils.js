// @ts-check
import { resolve } from 'node:path'
import { readFile } from 'node:fs/promises'
import { infoLog } from './log-utils.js'

//map all cids to a {name: string, cid: string} object
function getCidWithNameObjects(cids) {
  return cids.map((cid) => {
    let actualCid = cid
    let name = cid
    const cidParts = cid.split(' ')
    if (cidParts.length > 1) {
      actualCid = cidParts.slice(0, 1)[0] // the first non-space part of the line
      name = cidParts.slice(1).join(' ') // the rest of the line (allows for spaces)
    }
    return {
      name,
      cid: actualCid
    }
  })
}

export async function readAllCIDsFromFile (inputFile) {
  // resolve absolute path to file
  const absolutePathToFile = resolve(inputFile)
  infoLog(`Reading CIDs from file at path ${absolutePathToFile}`)
  const linesFromFile = await readFile(absolutePathToFile, {encoding: 'utf-8'})
  const lines = linesFromFile.split('\n').filter((line) => line.length > 0)
  infoLog(`Read ${lines.length} lines from file`)
  return getCidWithNameObjects(lines)
}

