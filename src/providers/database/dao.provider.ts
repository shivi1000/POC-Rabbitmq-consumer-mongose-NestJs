import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
@Injectable()
export class Dao {
  public ObjectId = Types.ObjectId;
  protected modelName;

  constructor(model: any) {
    this.modelName = model;
  }

  saveDataInBackground(data: any): Promise<any> {
    return new Promise((resolve) => {
      this.modelName
        .create(data)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }

  async saveData(data: any): Promise<any> {
    return new Promise((resolve) => {
      this.modelName
        .create(data)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }

  async getDataById(query: any): Promise<any> {
    return new Promise((resolve) => {
      this.modelName
        .findById(query)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }

  async findOne(query: any, projection: any = {}, options: any = {}): Promise<any> {
    return new Promise((resolve) => {
      this.modelName
        .findOne(query, projection, options)
        .lean()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }

  async findOneAndUpdate(conditions: any, update: any, options: any = {}): Promise<any> {
    return new Promise((resolve) => {
      this.modelName
        .findOneAndUpdate(conditions, update, options)
        .lean()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }

  async updateOne(conditions: any, update: any, options: any = { lean: true }): Promise<any> {
    return new Promise((resolve) => {
      this.modelName
        .updateOne(conditions, update, options)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }

  async updateMany(conditions: any, update: any, options: any = {}): Promise<any> {
    return new Promise((resolve) => {
      if (options != undefined) {
        options['writeConcern'] = { w: 'majority', wtimeout: 5000 };
      } else {
        options = { writeConcern: { w: 'majority', wtimeout: 5000 } };
      }
      this.modelName
        .updateMany(conditions, update, options)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }

  async findAll(query: any, projection: any = {}, options: any = {}): Promise<any> {
    return new Promise((resolve) => {
      this.modelName
        .find(query, projection, options)
        .lean()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }

  async findWithPagination(query: any, projection: any = {}, options: any = {}, page = 0, limit = 10): Promise<any> {
    return new Promise((resolve) => {
      const paginationResult: any = { next: false, page: page };
      this.modelName
        .find(query, projection, options)
        .skip((page - 1) * limit)
        .limit(limit + 1)
        .then((data: any) => {
          if (data.length) {
            if (data.length > limit) {
              paginationResult.next = true;
              data.slice(0, data.length - 1);
            } else paginationResult.result = data;
            resolve(paginationResult);
          } else resolve({ next: false, result: [], page: page });
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }

  async findAllPaginated(query: any, projection: any = {}, options: any = {}, page = 0, size = 10): Promise<any> {
    return new Promise((resolve) => {
      this.modelName
        .find(query, projection, options)
        .skip(page * size)
        .limit(size)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }

  async insertMany(data: any, options: any): Promise<any> {
    return new Promise((resolve) => {
      this.modelName
        .insertMany(data, options)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }

  async distinct(path: string): Promise<any> {
    return new Promise((resolve) => {
      this.modelName
        .distinct(path)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }

  async aggregateData(aggregateArray: any, options: any): Promise<any> {
    return new Promise((resolve) => {
      this.modelName
        .aggregate(aggregateArray)
        .then((data: any) => {
          if (options) {
            data.options = options;
          }
          resolve(data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }

  /**
   * @description paginate aggregate
   * @param pipeline
   * @param options.page - current page number
   * @param options.limit - fetch limit for records
   * @param options.getCount - (optional) gets the result with total record count
   * @param options.ranged - (optional) ranged based pagination
   */
  async paginateAggregate(pipeline: any[], options: any = {}) {
    if (options.getCount) {
      pipeline.push({
        $facet: {
          total: [{ $count: 'count' }],
          result: [{ $skip: (options.page - 1) * options.limit }, { $limit: options.limit }],
        },
      });

      let aggregateData: any;
      if (options.hint) {
        aggregateData = await this.modelName.aggregate(pipeline, { allowDiskUse: true }).collation({ locale: 'en', strength: 1 }).hint(options.hint).exec();
      } else aggregateData = await this.modelName.aggregate(pipeline, { allowDiskUse: true }).collation({ locale: 'en', strength: 1 }).exec();
      if (aggregateData.length) {
        if (aggregateData[0].result.length) {
          const paginationResult: any = { next: false, page: options.page, total: aggregateData[0].total[0].count };
          if (options.limit * options.page < paginationResult.total) {
            paginationResult.next = true;
          }
          paginationResult.result = aggregateData[0].result;
          return paginationResult;
        } else return { next: false, result: [], page: options.page, total: aggregateData[0].total.length ? aggregateData[0].total[0].count : 0 };
      } else throw new Error('Error in paginate aggregation pipeline');
    } else {
      if (!options.prePaginated) {
        if (options.range) pipeline.push({ $match: options.range });
        else pipeline.push({ $skip: (options.page - 1) * options.limit });
        pipeline.push({ $limit: options.limit + 1 });
      }

      let aggregateData: any;
      if (options.hint) {
        aggregateData = await this.modelName.aggregate(pipeline, { allowDiskUse: true }).collation({ locale: 'en', strength: 1 }).hint(options.hint).exec();
      } else aggregateData = await this.modelName.aggregate(pipeline, { allowDiskUse: true }).collation({ locale: 'en', strength: 1 }).exec();
      if (aggregateData.length) {
        const paginationResult: any = { next: false, page: options.page };
        if (aggregateData.length > options.limit) {
          paginationResult.next = true;
          paginationResult.result = aggregateData.slice(0, aggregateData.length - 1);
        } else paginationResult.result = aggregateData;
        return paginationResult;
      } else return { next: false, result: [], page: options.page };
    }
  }

  async deleteById(id: string): Promise<any> {
    return new Promise((resolve) => {
      this.modelName
        .findByIdAndRemove(id)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }

  async deleteMany(query: any): Promise<any> {
    return new Promise((resolve) => {
      this.modelName
        .deleteMany(query)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }

  async aggregate(query: any): Promise<any> {
    return new Promise((resolve) => {
      this.modelName
        .aggregate(query)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }

  async findAllCursor(query: any): Promise<any> {
    return await this.modelName.find(query).lean().cursor();
  }

  async aggregateCursor(query: any, batchSize: number): Promise<any> {
    return await this.modelName.aggregate(query).cursor({ batchSize: batchSize });
  }

  async vendorFindAllCursor(query: any): Promise<any> {
    return await this.modelName.find(query).lean().cursor();
  }

  async clientFindAllCursor(query: any): Promise<any> {
    return await this.modelName.find(query).lean().cursor();
  }

  async countDocuments(query: any): Promise<any> {
    return new Promise((resolve) => {
      this.modelName
        .countDocuments(query)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    });
  }
}
