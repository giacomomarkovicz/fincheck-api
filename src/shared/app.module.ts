import { Module } from '@nestjs/common'
import { UsersModule } from '../modules/users/users.module'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'
import { validate } from './config/env'
import { AuthModule } from 'src/modules/auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from 'src/modules/auth/auth.guard'
import { CategoriesModule } from 'src/modules/categories/categories.module'
import { BankAccountsModule } from 'src/modules/bank-accounts/bank-accounts.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    CategoriesModule,
    BankAccountsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
