import { Injectable, NotFoundException } from '@nestjs/common'
import { CategoriesRepository } from 'src/database/repositories/categories.repository'

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async validate(userId: string, categoryId: string) {
    const isOwner = await this.categoriesRepo.findFirst({
      where: { id: categoryId, userId }
    })

    if (!isOwner) throw new NotFoundException('Category not found')
  }
}
