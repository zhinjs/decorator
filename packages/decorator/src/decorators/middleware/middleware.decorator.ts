/**
 * @Date 2023-08-27 14:08:50
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 14:22:53
 * @FilePath /Decorator/packages/decorator/src/decorators/middleware/middleware.decorator.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import "reflect-metadata";
import { ZHIN_DECORATOR_KEY } from "../../constants";
import { ZhinDecorator } from "../../typings";

export function Middleware(target: Object, propertyKey: string | symbol): void;
export function Middleware(pretend?: boolean): MethodDecorator;
export function Middleware(param1: Object | boolean, param2?: string | symbol): MethodDecorator {
  if (!param1 || typeof param1 === "boolean") {
    return (target, propertyKey) => {
      let metadata: ZhinDecorator.IMiddlewareMetadata[] = Reflect.getMetadata(ZHIN_DECORATOR_KEY.ZHIN_Middleware_WATERMARK, target);
      if (!metadata) metadata = [];
      metadata.push({
        propertyKey,
        pretend: param1 as boolean,
      });
      Reflect.defineMetadata(ZHIN_DECORATOR_KEY.ZHIN_Middleware_WATERMARK, metadata, target);
    };
  } else {
    let metadata: ZhinDecorator.IMiddlewareMetadata[] = Reflect.getMetadata(ZHIN_DECORATOR_KEY.ZHIN_Middleware_WATERMARK, param1);
    if (!metadata) metadata = [];
    metadata.push({
      propertyKey: param2,
      pretend: false,
    });
    Reflect.defineMetadata(ZHIN_DECORATOR_KEY.ZHIN_Middleware_WATERMARK, metadata, param1);
  }
}
