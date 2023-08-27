/**
 * @Date 2023-08-27 13:59:43
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 16:18:42
 * @FilePath /Decorator/packages/decorator/src/decorators/command/command.decorator.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import "reflect-metadata";
import { ZHIN_DECORATOR_KEY } from "../../constants";
import { ICommandConfig, ICommandInitialValue, ZhinDecorator } from "../../typings";

export function Command(decl: string, config?: ICommandConfig): MethodDecorator;
export function Command(decl: string, initialValue?: ICommandInitialValue): MethodDecorator;
export function Command(decl: string, initialValue?: ICommandInitialValue, config?: ICommandConfig): MethodDecorator;
export function Command(...args: any): MethodDecorator {
  return (target, propertyKey) => {
    let metadata: ZhinDecorator.ICommandMetadata[] = Reflect.getMetadata(ZHIN_DECORATOR_KEY.ZHIN_Command_WATERMARK, target);
    if (!metadata) metadata = [];
    metadata.push({ propertyKey, args });
    Reflect.defineMetadata(ZHIN_DECORATOR_KEY.ZHIN_Command_WATERMARK, metadata, target);
  };
}
