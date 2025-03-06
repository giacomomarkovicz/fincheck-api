import { Global, Module } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { UsersRepository } from 'src/database/repositories/users.repository'

@Global()
@Module({
  providers: [PrismaService, UsersRepository],
  exports: [UsersRepository]
})
export class DatabaseModule {}
