/**
 * @Date 2023-08-27 16:08:15
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 22:13:19
 * @FilePath /Decorator/packages/test/plugins/repeater/index.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import {
  Command,
  CommandDesc,
  CommandOption,
  CommandSugar,
  Inject,
  InjectContext,
  InjectPlugin,
  MessagePattern,
  Middleware,
  Plugin,
  CommandRunTime,
} from "@zhinjs/decorator";
import { Next } from "koa";
import { Session, Context, Plugin as IPlugin } from "zhin";
import { RepeaterService } from "./repeater.service";

// * 定义一个插件
@Plugin
export default class Repeater {
  // *注入Plugin
  @InjectPlugin
  private readonly plugin: IPlugin;
  // *注入ctx
  @InjectContext
  private readonly ctx: Context;
  // *注入一个类
  @Inject(RepeaterService)
  private readonly repeaterService: RepeaterService;

  // !注意：注解是从下往上运行的；但是始终会按照一个顺序：`初始化命令->定义option->定义sugar->执行action`
  // * @CommandSugar是允许定义多个的
  @CommandSugar(/^来一首(.+)$/, {
    args: ["$1"],
    options: { platform: "qq", origin: true },
  })
  @CommandSugar("qq点歌", { options: { platform: "qq", origin: true } })
  // * @CommandOption是可以定义多个的
  @CommandOption("-o [origin:boolean]")
  @CommandOption("-p [platform:string]")
  @CommandOption("-s [singer:number]")
  // * 这是命令的描述
  @CommandDesc("命令的描述")
  // * @Command只能允许有一个；如果有多个会被上面的覆盖掉
  @Command("music <keyword:string>")
  defineCommand({ options, session }: CommandRunTime<{ platform: string; origin: boolean }>, keyword: string) {
    console.log(options);
    session.reply(options.origin);
  }

  // * 监听消息事件。允许同一个方法上有多个@MessagePattern
  @MessagePattern("icqq.message")
  onMessageReceived(seesion: Session) {
    seesion.reply("监听到一条消息");
  }

  // * 定义一个中间件。
  // !不能与@MessagePattern等交叉混用
  @Middleware
  aMiddleware(seesion: Session, next: Next) {
    seesion.reply(this.repeaterService.getMessage("middleware"));
    next();
  }
}
