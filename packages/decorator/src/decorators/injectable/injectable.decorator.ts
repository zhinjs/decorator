/**
 * @Date 2023-08-27 14:23:10
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 17:49:06
 * @FilePath /Decorator/packages/decorator/src/decorators/injectable/injectable.decorator.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import "reflect-metadata";
import { ZHIN_DECORATOR_KEY } from "../../constants";
import { IClass } from "../../typings";

export function Injectable(): ClassDecorator;
export function Injectable(target?: IClass): void;
export function Injectable(target?: IClass): void | ClassDecorator {
  if (!target) {
    return function (targetClass) {
      Reflect.defineMetadata(ZHIN_DECORATOR_KEY.ZHIN_Injectable_WATERMARK, true, targetClass);
    };
  }

  Reflect.defineMetadata(ZHIN_DECORATOR_KEY.ZHIN_Injectable_WATERMARK, true, target);
}
