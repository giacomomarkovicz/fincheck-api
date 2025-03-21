import { Injectable } from '@nestjs/common'
import { CreateTransactionDto } from '../dto/create-transaction.dto'
import { UpdateTransactionDto } from '../dto/update-transaction.dto'
import { TransactionsRepository } from 'src/database/repositories/transactions.repository'
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service'
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service'
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service'
import { TransactionType } from '../entities/Transaction'

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepo: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } =
      createTransactionDto

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId })

    return this.transactionRepo.create({
      data: { userId, bankAccountId, categoryId, date, name, type, value }
    })
  }

  findAllByUserId(
    userId: string,
    filters: {
      month: number
      year: number
      bankAccountId?: string
      type?: TransactionType
    }
  ) {
    return this.transactionRepo.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1))
        }
      }
    })
  }

  async update(
    userId: string,
    id: string,
    updateTransactionDto: UpdateTransactionDto
  ) {
    const { bankAccountId, categoryId, date, name, type, value } =
      updateTransactionDto

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId: id
    })

    return this.transactionRepo.update({
      where: { id },
      data: { bankAccountId, categoryId, date, name, type, value }
    })
  }

  async remove(userId: string, id: string) {
    await this.validateEntitiesOwnership({ userId, transactionId: id })

    await this.transactionRepo.delete({ where: { id } })

    return null
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId
  }: {
    userId: string
    bankAccountId?: string
    categoryId?: string
    transactionId?: string
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnershipService.validate(
          userId,
          transactionId
        ),
      bankAccountId &&
        this.validateBankAccountOwnershipService.validate(
          userId,
          bankAccountId
        ),
      categoryId &&
        this.validateCategoryOwnershipService.validate(userId, categoryId)
    ])
  }
}
