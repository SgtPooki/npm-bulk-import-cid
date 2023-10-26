// @ts-check
import chalk from 'chalk';

export const errorLog = (msg) => console.log(chalk.redBright.bold(msg))
export const stderrOutput = (msg) => console.log(chalk.red(msg))
export const successLog = (msg) => console.log(chalk.green(msg))
export const subprocessLog = (msg) => console.log(chalk.blue(msg))
export const infoLog = (msg) => console.log(chalk.yellow(msg))

export const prefixAllLines = (prefixText, lines) => lines.split('\n').map((line) => `${prefixText}${line}`).join('\n')
