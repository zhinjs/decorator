/**
 * @Date 2023-08-27 16:08:15
 * @Author Zero 1203970284@qq.com
 * @LastEditTime 2023-08-27 17:50:16
 * @FilePath /Decorator/packages/test/plugins/repeater/index.ts
 * @Copyright (c) 2023 by Zero, All Rights Reserved.
 */
import { Inject, Plugin } from "@zhinjs/decorator";
import { RepeaterService } from "./repeater.service";

@Plugin()
export default class Repeater {
  @Inject(RepeaterService)
  private readonly repeaterService: RepeaterService;
}
