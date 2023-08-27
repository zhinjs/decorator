# @zhinjs/decorator

<a href="https://github.com/@zhinjs/decorator">

![version](https://img.shields.io/github/package-json/v/zhinjs/decorator?filename=packages%2Fdecorator%2Fpackage.json)

</a>

一个全新的机器人开发范式：使用 Decorator 开发 QQ 机器人！

> ⚠️请注意：使用本项目必须要使用TypeScript

## 安装

在你的项目根目录下执行：

```bash
pnpm install @zhinjs/decorator
```

然后在你的`tsconfig.json`文件中：

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```

必须包含这两行，值都为`true`。

## 使用

熟悉Spring/Nest/Midway等的的开发者应该会很熟悉。

您可以将`@Plugin`看成是`@Controller`。

### 撰写一个插件

```typescript
// plugins/repeater/index.ts
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

@Plugin
export default class Repeater {
  // *注入Plugin
  @InjectPlugin
  private readonly plugin: IPlugin;
  // *注入ctx
  @InjectContext
  private readonly ctx: Context;
  // *注入一个“服务类”，下面会有说明
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
```

### 撰写一个服务

服务的作用，是用来封装具体的业务逻辑的。

服务可以嵌套注入服务，但是请避免产生循环注入的情况（即A注入B，B又注入A），要不然会错误的哦（

```typescript
import { Injectable } from "@zhinjs/decorator";

// 标记这是一个服务
// 按道理来说，这个@Injectable是可以和nestjs通用的哦～
// 但是我暂时没有测试过，但是十有八九是通用的，因为nest是可插拔的
@Injectable()
export class RepeaterService {
  // 写一个方法
  getMessage(type: "pattern" | "middleware") {
    if (type === "pattern") {
      return "hello world! This is a Message Pattern's message!";
    } else if (type === "middleware") {
      return "hello world! This is a middleware message!";
    }
  }
}
```

目前的内容大概就是这样了～欢迎大家提issue～
