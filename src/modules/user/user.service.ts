import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'modules/auth/interfaces/jwtPayload.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);

    return await this.userRepository.save(newUser);
  }

  async findAllUser() {
    const listUsers = await this.userRepository.find({
      select: ['email', 'name'],
    });
    return;
  }

  async findOneUser(opts) {
    try {
      return await this.userRepository.findOne({});
    } catch (error) {}
  }
  // findOne(id: number) {
  //   const user = await this.userRepository.findOneByOrFail(id);
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
