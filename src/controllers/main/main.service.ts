import { Injectable } from '@nestjs/common';


@Injectable()
export class MainService {
  create() {
    return 'This action adds a new main';
  }

  findAll() {
    return `This action returns all main`;
  }

  findOne(id: number) {
    return `This action returns a #${id} main`;
  }

  update(id: number) {
    return `This action updates a #${id} main`;
  }

  remove(id: number) {
    return `This action removes a #${id} main`;
  }
}
