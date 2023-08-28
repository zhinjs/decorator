/**
 * @Date 2023-08-27 16:08:15
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-28 11:05:48
 * @FilePath /Decorator/packages/test/plugins/repeater/index.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import { Command, Plugin } from "@zhinjs/decorator";
import { Session } from "zhin";

// * 定义一个插件
@Plugin
export default class Repeater {
  private readonly user = [1203970284];

  @Command("getName")
  public main(session: Session) {
    if (this.user.includes(session.user_id as number)) {
      session.reply("app");
    }
  }
}
