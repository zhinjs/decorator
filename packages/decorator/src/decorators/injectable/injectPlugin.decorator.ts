/**
 * @Date 2023-08-27 16:15:22
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 16:15:46
 * @FilePath /Decorator/packages/decorator/src/decorators/injectable/injectPlugin.decorator.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import { ZHIN_DECORATOR_KEY } from "../../constants";

export const InjectPlugin: PropertyDecorator = (target, propertyKey) => {
  let metadata: (string | symbol)[] = Reflect.getMetadata(ZHIN_DECORATOR_KEY.ZHIN_PluginClassInject_WATERMARK, target);
  if (!metadata) metadata = [];
  metadata.push(propertyKey);
  Reflect.defineMetadata(ZHIN_DECORATOR_KEY.ZHIN_PluginClassInject_WATERMARK, metadata, target);
};
