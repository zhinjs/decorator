/**
 * @Date 2023-08-27 16:21:01
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 16:21:34
 * @FilePath /Decorator/packages/decorator/src/decorators/command/commandSugar.decorator.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import { Command } from "zhin";
import { ZhinDecorator } from "../../typings";
import { ZHIN_DECORATOR_KEY } from "../../constants";

export function CommandSugar(sugar: string | RegExp, config?: Omit<Command.Sugar, "regexp">): MethodDecorator {
  return (target, propertyKey) => {
    let metadata: ZhinDecorator.ICommandSugarMetadata<any, any>[] = Reflect.getMetadata(
      ZHIN_DECORATOR_KEY.ZHIN_CommandSugar_WATERMARK,
      target,
      propertyKey,
    );
    if (!metadata) metadata = [];
    metadata.push({
      sugar,
      config,
    });
    Reflect.defineMetadata(ZHIN_DECORATOR_KEY.ZHIN_CommandSugar_WATERMARK, metadata, target, propertyKey);
  };
}
