import { Module } from '@nestjs/common'
import { UsersModule } from '../modules/users/users.module'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'
import { validate } from './config/env'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true
    }),
    UsersModule,
    DatabaseModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
