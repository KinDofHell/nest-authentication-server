import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  //find user by its name
  async findOne(name: string): Promise<User | undefined> {
    return this.userModel.findOne({ name }).exec();
  }
}
