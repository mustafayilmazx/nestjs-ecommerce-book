/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';

const DAO_SERIALIZER_CLASS_REFLECTION_KEY =
  '__DAO_SERIALIZER_CLASS_REFLECTION_KEY';

export const SerializeToDao = (classReflection: any) =>
  SetMetadata(DAO_SERIALIZER_CLASS_REFLECTION_KEY, classReflection);

export class DaoSerializerInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, handler: CallHandler) {
    return handler.handle().pipe(
      map((data: Record<string, unknown>) => {
        const classReflection = this.reflector.get<any>(
          DAO_SERIALIZER_CLASS_REFLECTION_KEY,
          context.getHandler(),
        );

        if (classReflection) {
          return plainToInstance(classReflection, data, {
            excludeExtraneousValues: true,
          });
        }
      }),
    );
  }
}
