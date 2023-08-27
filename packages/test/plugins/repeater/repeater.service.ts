/**
 * @Date 2023-08-27 16:36:17
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 17:49:58
 * @FilePath /Decorator/packages/test/plugins/repeater/repeater.service.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import { Injectable } from "@zhinjs/decorator";

@Injectable()
export class RepeaterService {
  async getMessage(type: "pattern" | "middleware") {
    if (type === "pattern") {
      return "hello world! This is a Message Pattern's message!";
    } else if (type === "middleware") {
      return "hello world! This is a middleware message!";
    }
  }
}
