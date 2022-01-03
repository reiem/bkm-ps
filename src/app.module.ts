import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        if (configService.get<string>('NODE_ENV') === 'test') {
          return {
            type: 'postgres',
            host: 'db_test',
            port: 5432,
            username: 'postgres-test',
            password: 'postgres-test',
            database: 'bkmps-test',
            entities: [User],
            synchronize: true,
          };
        }
        return {
          type: 'postgres',
          host: 'db_dev',
          port: 5432,
          username: 'postgres-dev',
          password: 'postgres-dev',
          database: 'bkmps-dev',
          entities: [User],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
