/**
 * @Date 2023-08-27 16:14:01
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 16:14:50
 * @FilePath /Decorator/packages/decorator/src/decorators/injectable/injectContext.decorator.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import "reflect-metadata";
import { ZHIN_DECORATOR_KEY } from "../../constants";

export const InjectContext: PropertyDecorator = (target, propertyKey) => {
  let metadata: (string | symbol)[] = Reflect.getMetadata(ZHIN_DECORATOR_KEY.ZHIN_ContextClassInject_WATERMARK, target);
  if (!metadata) metadata = [];
  metadata.push(propertyKey);
  Reflect.defineMetadata(ZHIN_DECORATOR_KEY.ZHIN_ContextClassInject_WATERMARK, metadata, target);
};
