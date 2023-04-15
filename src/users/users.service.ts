import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly configService: ConfigService,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
    });
  }

  async findAll(): Promise<User[]> {
    // TBE: Experimental only
    const port = this.configService.get<number>('port');
    console.log(port);

    return this.userModel.findAll();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
