import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from './../env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate: validate,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
