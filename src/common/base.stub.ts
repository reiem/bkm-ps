import { BaseEntity } from './base.entity';

export const baseStub = (): BaseEntity => ({
  id: 123,
  createdDate: new Date('2022-07-22T19:57:03.171Z'),
  updatedDate: new Date('2022-07-22T19:57:03.171Z'),
  deletedDate: null,
});
