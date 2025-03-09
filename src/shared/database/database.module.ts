import { Global, Module } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { BankAccountsRepository } from 'src/database/repositories/bank-accounts.repository'
import { CategoriesRepository } from 'src/database/repositories/categories.repository'
import { UsersRepository } from 'src/database/repositories/users.repository'

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository
  ],
  exports: [UsersRepository, CategoriesRepository, BankAccountsRepository]
})
export class DatabaseModule {}
