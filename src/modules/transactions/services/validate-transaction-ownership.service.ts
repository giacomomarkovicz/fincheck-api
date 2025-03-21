import { Injectable, NotFoundException } from '@nestjs/common'
import { TransactionsRepository } from 'src/database/repositories/transactions.repository'

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(private readonly transactionsRepo: TransactionsRepository) {}

  async validate(userId: string, transactionId: string) {
    const isOwner = await this.transactionsRepo.findFirst({
      where: { id: transactionId, userId }
    })

    if (!isOwner) throw new NotFoundException('Transaction not found')
  }
}
