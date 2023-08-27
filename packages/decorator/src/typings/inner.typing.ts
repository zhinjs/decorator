/**
 * @Date 2023-08-27 14:10:53
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 17:02:42
 * @FilePath /Decorator/packages/decorator/src/typings/inner.typing.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import { Command, Context, Zhin } from "zhin";
import { IClass, OptionValueType } from "./type.typing";

export namespace ZhinDecorator {
  export interface IMiddlewareMetadata {
    propertyKey: string | symbol;
    pretend: boolean;
  }

  export interface IMessagePatternMetadata {
    propertyKey: string | symbol;
    event: string | symbol;
  }

  export interface IAutowiredMetadata {
    propertyKey: string | symbol;
    injectable: IClass;
  }

  export interface ICommandMetadata {
    propertyKey: string | symbol;
    args: [string];
  }

  export interface ICommandOptionMetadata<S extends string> {
    option: S;
    initialValue: OptionValueType<S>;
  }

  export interface ICommandSugarMetadata<T extends [] = [], Q extends {} = {}> {
    sugar: string | RegExp;
    config: Omit<Command.Sugar<T, Q>, "regexp">;
  }
}
