import { Injectable } from '@nestjs/common'
import { CreateBankAccountDto } from '../dto/create-bank-account.dto'
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto'
import { BankAccountsRepository } from 'src/database/repositories/bank-accounts.repository'
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service'

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto

    return this.bankAccountsRepo.create({
      data: { userId, color, initialBalance, name, type }
    })
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepo.findMany({
      where: { userId },
      include: { transactions: { select: { type: true, value: true } } }
    })

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === 'INCOME'
            ? transaction.value
            : -transaction.value),
        0
      )

      const currentBalance = bankAccount.initialBalance + totalTransactions

      return {
        currentBalance,
        ...bankAccount
      }
    })
  }

  async update(
    userId: string,
    id: string,
    updateBankAccountDto: UpdateBankAccountDto
  ) {
    const { color, initialBalance, name, type } = updateBankAccountDto

    await this.validateBankAccountOwnershipService.validate(userId, id)

    return this.bankAccountsRepo.update({
      where: { id },
      data: { color, initialBalance, name, type }
    })
  }

  async remove(userId: string, id: string) {
    await this.validateBankAccountOwnershipService.validate(userId, id)

    await this.bankAccountsRepo.delete({ where: { id } })

    return null
  }
}
