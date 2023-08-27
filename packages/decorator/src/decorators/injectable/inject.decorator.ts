import { Logger } from "../../classes/logger.class";
import { ZHIN_DECORATOR_KEY } from "../../constants";
import { NotInjectableError } from "../../errors/injectError.error";
import { IClass, ZhinDecorator } from "../../typings";

export function Inject(injectable: IClass): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol): void => {
    const isInjectable = Reflect.getMetadata(ZHIN_DECORATOR_KEY.ZHIN_Injectable_WATERMARK, injectable);
    if (!isInjectable) throw new NotInjectableError(injectable.name);
    new Logger().info(`服务${injectable.name}已装载`);

    let metadata: ZhinDecorator.IAutowiredMetadata[] = Reflect.getMetadata(ZHIN_DECORATOR_KEY.ZHIN_Injecter_WATERMARK, target);
    if (!metadata) metadata = [];
    metadata.push({
      propertyKey,
      injectable: injectable,
    });
    Reflect.defineMetadata(ZHIN_DECORATOR_KEY.ZHIN_Injecter_WATERMARK, metadata, target);
  };
}
