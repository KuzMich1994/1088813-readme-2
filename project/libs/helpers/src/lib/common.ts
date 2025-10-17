import { ClassTransformOptions, plainToInstance } from 'class-transformer';

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T;

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T[];

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

export function getMongoConnectionString({
  userName,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}: {
  userName?: string;
  password?: string;
  host?: string;
  port?: string;
  databaseName?: string;
  authDatabase?: string;
}): string {
  return `mongodb://${userName}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}
