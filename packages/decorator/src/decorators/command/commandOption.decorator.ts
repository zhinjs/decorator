/**
 * @Date 2023-08-27 16:20:17
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 16:20:29
 * @FilePath /Decorator/packages/decorator/src/decorators/command/commandOption.decorator.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import { ZHIN_DECORATOR_KEY } from "../../constants";
import { OptionValueType, ZhinDecorator } from "../../typings";

export function CommandOption<S extends string>(option: S, initialValue?: OptionValueType<S>): MethodDecorator {
  return (target, propertyKey) => {
    let metadata: ZhinDecorator.ICommandOptionMetadata<S>[] = Reflect.getMetadata(
      ZHIN_DECORATOR_KEY.ZHIN_CommandOption_WATERMARK,
      target,
      propertyKey,
    );
    if (!metadata) metadata = [];
    metadata.push({
      option,
      initialValue,
    });
    Reflect.defineMetadata(ZHIN_DECORATOR_KEY.ZHIN_CommandOption_WATERMARK, metadata, target, propertyKey);
  };
}
