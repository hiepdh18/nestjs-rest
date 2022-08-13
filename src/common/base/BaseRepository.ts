import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class ModelEntity {
  id: number | string;
  [key: string]: any;
}

@Injectable()
export class ModelRepository<T, K extends ModelEntity> extends Repository<T> {
  async getAllEntity(
    relations: string[] = [],
    throwsException = false,
  ): Promise<K[] | null> {
    return await this.find({ relations }).then((entity) => {
      if (!entity && throwsException) {
        return Promise.reject(new NotFoundException('Model not found'));
      }

      return Promise.resolve(entity ? this.transformMany(entity) : null);
    });
  }

  // async getEntityById(
  //   id: string | number,
  //   relations: string[] = [],
  //   throwsException = false,
  // ): Promise<K | null> {
  //   return await this.findOne({ id }).then((entity) => {
  //     if (!entity && throwsException) {
  //       return Promise.reject(new NotFoundException('Model not found'));
  //     }

  //     return Promise.resolve(entity ? this.transform(entity) : null);
  //   });
  // }

  // async createEntity(
  //   inputs: DeepPartial<T>,
  //   relations: string[] = [],
  // ): Promise<K> {
  //   return await this.save(inputs)
  //     .then(async (entity) => {
  //       return await this.getEntityById((entity as any).id, relations);
  //     })
  //     .catch((error) => Promise.reject(error));
  // }

  // async updateEntity(
  //   entity: K,
  //   inputs: QueryDeepPartialEntity<T>,
  //   relations: string[] = [],
  // ): Promise<K> {
  //   return await this.update(entity.id, inputs)
  //     .then(async (entity) => {
  //       return await this.getEntityById((entity as any).id, relations);
  //     })
  //     .catch((error) => Promise.reject(error));
  // }

  async deleteEntityById(id: number | string): Promise<boolean> {
    return await this.delete(id)
      .then(() => {
        return true;
      })
      .catch((error) => Promise.reject(error));
  }

  transform(model: T, transformOptions = {}): K {
    return plainToClass(ModelEntity, model, transformOptions) as K;
  }

  transformMany(model: T[], transformOptions = {}): K[] {
    return model.map((model) => this.transform(model, transformOptions));
  }
}
