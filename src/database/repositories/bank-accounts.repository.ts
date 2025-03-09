import { Injectable } from '@nestjs/common'
import { type Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(createDto)
  }

  findUnique(findUnique: Prisma.BankAccountFindUniqueArgs) {
    return this.prismaService.bankAccount.findUnique(findUnique)
  }

  findMany(findManyDto: Prisma.BankAccountFindManyArgs) {
    return this.prismaService.bankAccount.findMany(findManyDto)
  }
}
