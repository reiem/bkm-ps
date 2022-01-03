import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsString,
  IsNumberString,
  validateSync,
  ValidateIf,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  DB_HOST: string;

  @IsNumberString()
  DB_PORT: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @ValidateIf((o) => o.NODE_ENV === 'test')
  @IsString()
  DB_TEST_HOST: string;

  @ValidateIf((o) => o.NODE_ENV === 'test')
  @IsNumberString()
  DB_TEST_PORT: string;

  @ValidateIf((o) => o.NODE_ENV === 'test')
  @IsString()
  DB_TEST_NAME: string;

  @ValidateIf((o) => o.NODE_ENV === 'test')
  @IsString()
  DB_TEST_USER: string;

  @ValidateIf((o) => o.NODE_ENV === 'test')
  @IsString()
  DB_TEST_PASSWORD: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
