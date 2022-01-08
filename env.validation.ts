import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsString,
  IsNumberString,
  IsOptional,
  validateSync,
  ValidateIf,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

const isTest = (envObj: EnvironmentVariables) => envObj.NODE_ENV === 'test';
const isNotTest = (envObj: EnvironmentVariables) => !isTest(envObj);

class EnvironmentVariables {
  @IsOptional()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @ValidateIf(isNotTest)
  @IsString()
  DB_HOST: string;

  @ValidateIf(isNotTest)
  @IsNumberString()
  DB_PORT: string;

  @ValidateIf(isNotTest)
  @IsString()
  DB_NAME: string;

  @ValidateIf(isNotTest)
  @IsString()
  DB_USER: string;

  @ValidateIf(isNotTest)
  @IsString()
  DB_PASSWORD: string;

  @ValidateIf(isTest)
  @IsString()
  DB_TEST_HOST: string;

  @ValidateIf(isTest)
  @IsNumberString()
  DB_TEST_PORT: string;

  @ValidateIf(isTest)
  @IsString()
  DB_TEST_NAME: string;

  @ValidateIf(isTest)
  @IsString()
  DB_TEST_USER: string;

  @ValidateIf(isTest)
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
