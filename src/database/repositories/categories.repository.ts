import { Injectable } from '@nestjs/common'
import { type Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.CategoryCreateArgs) {
    return this.prismaService.category.create(createDto)
  }

  findUnique(findUnique: Prisma.CategoryFindUniqueArgs) {
    return this.prismaService.category.findUnique(findUnique)
  }

  findMany(findManyDto: Prisma.CategoryFindManyArgs) {
    return this.prismaService.category.findMany(findManyDto)
  }
}
