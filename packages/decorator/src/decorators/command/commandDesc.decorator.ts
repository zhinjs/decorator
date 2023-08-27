/**
 * @Date 2023-08-27 16:19:40
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 16:19:52
 * @FilePath /Decorator/packages/decorator/src/decorators/command/commandDesc.decorator.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import { ZHIN_DECORATOR_KEY } from "../../constants";

export function CommandDesc(desc: string): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(ZHIN_DECORATOR_KEY.ZHIN_CommandDesc_WATERMARK, desc, target, propertyKey);
  };
}
