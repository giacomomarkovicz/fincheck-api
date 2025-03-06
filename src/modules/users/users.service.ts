import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { UsersRepository } from 'src/database/repositories/users.repository'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
