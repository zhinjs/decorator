/**
 * @Date 2023-08-24 18:38:45
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 14:11:26
 * @FilePath /Decorator/packages/decorator/src/typings/type.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import { ArgsType, Command, NSession, OptionsType, Zhin } from "zhin";

export type IClass<T = Record<string | symbol, any>> = new () => T;

export type Session = NSession<keyof Zhin.Adapters>;

export type ICommandInitialValue = ArgsType<Command.RemoveFirst<Command.Declare>>;

export type OptionValueType<S extends string> = OptionsType<S> extends {
  [key: string]: infer T;
}
  ? T
  : never;

export type CommandRunTime<O = {}, A extends any[] = []> = Command.RunTime<Session, A, O>;

export type ICommandConfig = Command.Config;
