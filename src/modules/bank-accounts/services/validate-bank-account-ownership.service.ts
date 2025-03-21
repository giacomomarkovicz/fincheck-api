import { Injectable, NotFoundException } from '@nestjs/common'
import { BankAccountsRepository } from 'src/database/repositories/bank-accounts.repository'

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(private readonly bankAccountsRepo: BankAccountsRepository) {}

  async validate(userId: string, bankAccountId: string) {
    const isOwner = await this.bankAccountsRepo.findFirst({
      where: { id: bankAccountId, userId }
    })

    if (!isOwner) throw new NotFoundException('Bank account not found')
  }
}
