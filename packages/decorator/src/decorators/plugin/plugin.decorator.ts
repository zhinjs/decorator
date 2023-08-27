/**
 * @Date 2023-08-24 18:37:25
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 16:26:50
 * @FilePath /Decorator/packages/decorator/src/decorators/plugin/plugin.decorator.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */

import "reflect-metadata";
import { Context, Plugin as IPlugin } from "zhin";
import { IClass } from "../../typings";
import { InitPlugin } from "../../classes/initPlugin.class";

export function Plugin(): ClassDecorator;
export function Plugin(target?: IClass): void;
export function Plugin(target?: IClass): any {
  if (!target) {
    return (target: IClass) =>
      function (this: IPlugin, ctx: Context) {
        new InitPlugin(ctx, new target(), this)
          .initPluginClass()
          .initContext()
          .initInjectable()
          .initMessagePattern()
          .initCommand()
          .initMiddleware();
      };
  } else {
    return function (this: IPlugin, ctx: Context) {
      new InitPlugin(ctx, new target(), this)
        .initPluginClass()
        .initContext()
        .initInjectable()
        .initMessagePattern()
        .initCommand()
        .initMiddleware();
    };
  }
}
