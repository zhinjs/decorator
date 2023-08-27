import { ZHIN_DECORATOR_KEY } from "../../constants";
import { IClass, ZhinDecorator } from "../../typings";
import { getLogger } from "log4js";

const logger = getLogger();
logger.level = "debug";

export function Inject(injectable: IClass): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol): void => {
    const isInjectable = Reflect.getMetadata(ZHIN_DECORATOR_KEY.ZHIN_Injectable_WATERMARK, injectable);
    if (!isInjectable) {
      const message = `无法装载类 ${injectable.name} 注入到上下文，因为它似乎并不是一个服务。请确保在该类上使用了@Injectable注解，否则无法被注入`;
      logger.error(message);
      throw new Error(message);
    }
    logger.info(`服务${injectable.name}已被装载`);

    let metadata: ZhinDecorator.IAutowiredMetadata[] = Reflect.getMetadata(ZHIN_DECORATOR_KEY.ZHIN_Injecter_WATERMARK, target);
    if (!metadata) metadata = [];
    metadata.push({
      propertyKey,
      injectable: injectable,
    });
    Reflect.defineMetadata(ZHIN_DECORATOR_KEY.ZHIN_Injecter_WATERMARK, metadata, target);
  };
}
