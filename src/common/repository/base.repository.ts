import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

@Injectable()
export class BaseRepository<T> {
  constructor(protected readonly repository: Repository<T>) { }

  async index(): Promise<T[]> {
    return await this.repository.find();
  }

  async findById(id: EntityId): Promise<T> {
    return await this.repository.findOneById(id);
  }

  async findByIds(ids: [EntityId]): Promise<T[]> {
    return await this.repository.findByIds(ids);
  }

  async findOne(opts: any = {}): Promise<T> {
    return await this.repository.findOne(opts);
  }

  async findAll(opts: any = {}): Promise<T[]> {
    return await this.repository.find(opts);
  }

  async update(filter: any = {}, update: any = {}): Promise<T> {
    await this.repository.update(filter, update);
    return this.findOne(filter);
  }

  async delete(opts: any = {}): Promise<DeleteResult> {
    return await this.repository.delete(opts);
  }

  async count(opts: any = {}): Promise<number> {
    return await this.repository.count(opts);
  }
}
