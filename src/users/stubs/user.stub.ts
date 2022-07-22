import { baseStub } from '../../common/base.stub';
import { User } from '../entities/user.entity';

export const userStub = (): User => {
  return {
    ...baseStub(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
  };
};
