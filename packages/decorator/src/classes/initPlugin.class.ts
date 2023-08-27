/**
 * @Date 2023-08-27 16:11:27
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 17:13:19
 * @FilePath /Decorator/packages/decorator/src/classes/initPlugin.class.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import { Context, Plugin } from "zhin";
import { ZHIN_DECORATOR_KEY } from "../constants";
import { ZhinDecorator } from "../typings";

export class InitPlugin {
  constructor(
    private readonly ctx: Context,
    private readonly newed: Record<string | symbol, any>,
    private readonly plugin: Plugin,
  ) {}

  initPluginClass() {
    let injectPluginPropertyKeys: (string | symbol)[] = Reflect.getMetadata(ZHIN_DECORATOR_KEY.ZHIN_PluginClassInject_WATERMARK, this.newed);
    if (!injectPluginPropertyKeys) injectPluginPropertyKeys = [];
    injectPluginPropertyKeys.forEach((item) => (this.newed[item] = this.plugin));
    return this;
  }

  initContext() {
    let injectContextPropertyKeys: (string | symbol)[] = Reflect.getMetadata(ZHIN_DECORATOR_KEY.ZHIN_ContextClassInject_WATERMARK, this.newed);
    if (!injectContextPropertyKeys) injectContextPropertyKeys = [];
    injectContextPropertyKeys.forEach((item) => (this.newed[item] = this.ctx));
    return this;
  }

  initInjectable(newedStructure: Record<string | symbol, any> = this.newed) {
    let autowiredMethods: ZhinDecorator.IAutowiredMetadata[] = Reflect.getMetadata(ZHIN_DECORATOR_KEY.ZHIN_Injecter_WATERMARK, newedStructure);
    if (!autowiredMethods) autowiredMethods = [];
    for (let i = 0; i < autowiredMethods.length; i++) {
      const { propertyKey, injectable } = autowiredMethods[i];
      const injectableStructure = new injectable();
      this.initInjectable(injectableStructure);
      newedStructure[propertyKey] = injectableStructure;
    }
    return this;
  }

  initMessagePattern() {
    let messagePatternPropertyKeys: ZhinDecorator.IMessagePatternMetadata[] = Reflect.getMetadata(
      ZHIN_DECORATOR_KEY.ZHIN_MessagePattern_WATERMARK,
      this.newed,
    );
    if (!messagePatternPropertyKeys) messagePatternPropertyKeys = [];
    messagePatternPropertyKeys.forEach((item) => this.ctx.on(item.event, (...args) => this.newed[item.propertyKey](...args)));
    return this;
  }

  initCommand() {
    let commandMethods: ZhinDecorator.ICommandMetadata[] = Reflect.getMetadata(ZHIN_DECORATOR_KEY.ZHIN_Command_WATERMARK, this.newed);
    if (!commandMethods) commandMethods = [];
    commandMethods.forEach((item) => {
      const newCommand = this.ctx.command(...item.args);

      const commandDesc: string = Reflect.getMetadata(ZHIN_DECORATOR_KEY.ZHIN_CommandDesc_WATERMARK, this.newed, item.propertyKey);
      newCommand.desc(commandDesc);

      let commandOptions: ZhinDecorator.ICommandOptionMetadata<string>[] = Reflect.getMetadata(
        ZHIN_DECORATOR_KEY.ZHIN_CommandOption_WATERMARK,
        this.newed,
        item.propertyKey,
      );
      if (!commandOptions) commandOptions = [];
      commandOptions.forEach((item) => {
        newCommand.option(item.option, item.initialValue);
      });

      let commandSugars: ZhinDecorator.ICommandSugarMetadata[] = Reflect.getMetadata(
        ZHIN_DECORATOR_KEY.ZHIN_CommandSugar_WATERMARK,
        this.newed,
        item.propertyKey,
      );
      if (!commandSugars) commandSugars = [];
      commandSugars.forEach((item) => {
        newCommand.sugar(item.sugar, item.config);
      });

      newCommand.action(this.newed[item.propertyKey]);
    });
    return this;
  }

  initMiddleware() {
    let middlewareMethods: ZhinDecorator.IMiddlewareMetadata[] = Reflect.getMetadata(ZHIN_DECORATOR_KEY.ZHIN_Middleware_WATERMARK, this.newed);
    if (!middlewareMethods) middlewareMethods = [];
    middlewareMethods.forEach((item) => this.ctx.middleware((...args) => this.newed[item.propertyKey](...args), item.pretend));
  }
}
