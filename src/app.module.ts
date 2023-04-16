import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CacheModule } from '@nestjs/cache-manager';

// environment variables
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  cache: true,
  load: [config],
});

// database with sequelize
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
const sequelizeOptions: SequelizeModuleOptions = {
  dialect: 'mssql',
  host: process.env.AZURE_SQL_HOST,
  port: 1433,
  username: process.env.AZURE_SQL_USERNAME,
  password: process.env.AZURE_SQL_PASSWORD,
  database: process.env.AZURE_SQL_DATABASE,
  autoLoadModels: true,
  synchronize: true,
};
const dbModule = SequelizeModule.forRoot(sequelizeOptions);

// caching
const cacheModule = CacheModule.register({ isGlobal: true });

@Module({
  imports: [CatsModule, UsersModule, dbModule, configModule, cacheModule],
})
export class AppModule {}
