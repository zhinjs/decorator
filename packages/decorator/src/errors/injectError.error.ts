/**
 * @Date 2023-08-27 18:52:06
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 19:01:24
 * @FilePath /Decorator/packages/decorator/src/errors/injectError.error.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */

import { Logger } from "../classes/logger.class";

export class NotInjectableError extends Error {
  constructor(className: string) {
    const message = `无法装载类 ${className} 注入到上下文，因为它似乎并不是一个服务。请确保在该类上使用了@Injectable注解，否则无法被注入`;
    new Logger().error(message);
    super(message);
  }
}
