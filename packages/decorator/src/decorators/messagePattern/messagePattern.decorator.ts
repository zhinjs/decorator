/**
 * @Date 2023-08-24 23:26:50
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 17:02:44
 * @FilePath /Decorator/packages/decorator/src/decorators/messagePattern/messagePattern.decorator.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import "reflect-metadata";
import { Context, Zhin } from "zhin";
import { ZHIN_DECORATOR_KEY } from "../../constants";
import { ZhinDecorator } from "../../typings";

/**
 * 传入一个事件名，响应一个事件
 *
 * @author Zero <gczgroup@qq.com>
 * @date 27/08/2023
 * @export
 * @param {(string | symbol)} event
 * @return {*}  {MethodDecorator}
 */
export function MessagePattern(event: string | symbol): MethodDecorator;
/**
 * 传入一个事件名，响应一个事件
 *
 * @author Zero <gczgroup@qq.com>
 * @date 27/08/2023
 * @export
 * @template E
 * @param {E} event
 * @return {*}  {MethodDecorator}
 */
export function MessagePattern<E extends keyof Zhin.EventMap<Context>>(event: E): MethodDecorator;

export function MessagePattern(event: string | symbol): MethodDecorator {
  return (target, propertyKey) => {
    let metadata: ZhinDecorator.IMessagePatternMetadata[] = Reflect.getMetadata(ZHIN_DECORATOR_KEY.ZHIN_MessagePattern_WATERMARK, target);
    if (!metadata) metadata = [];
    metadata.push({
      propertyKey,
      event,
    });
    Reflect.defineMetadata(ZHIN_DECORATOR_KEY.ZHIN_MessagePattern_WATERMARK, metadata, target);
  };
}
