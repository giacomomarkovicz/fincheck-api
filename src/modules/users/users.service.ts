import { Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/database/repositories/users.repository'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async getUserById(userId: string) {
    return this.usersRepo.findUnique({
      where: { id: userId },
      omit: { id: true, password: true }
    })
  }
}
