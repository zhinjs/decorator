/**
 * @Date 2023-08-27 18:13:46
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 19:12:49
 * @FilePath /Decorator/packages/decorator/src/classes/logger.class.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */

import chalk from "chalk";

export class Logger {
  private getPrefix(type: "INFO" | "ERROR") {
    return `[${type}] [zhin decorator]`;
  }

  info(message: string): void {
    const time = chalk.green(`[${new Date().toISOString()}]`);
    const prefix = chalk.green(this.getPrefix("INFO"));
    console.log(`${time} ${prefix} - ${message}`);
  }

  error(message: string): void {
    const time = chalk.red(`[${new Date().toISOString()}]`);
    const prefix = chalk.red(this.getPrefix("ERROR"));
    console.log(`${time} ${prefix} - ${message}`);
  }
}
