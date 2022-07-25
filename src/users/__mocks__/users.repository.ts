import { userStub } from '../stubs/user.stub';

export const UserRepository = jest.fn().mockReturnValue({
  save: jest.fn().mockResolvedValue(userStub()),
  create: jest.fn(),
  find: jest.fn().mockResolvedValue([userStub()]),
  findOneOrFail: jest.fn().mockResolvedValue(userStub()),
  preload: jest.fn().mockResolvedValue(userStub()),
  softRemove: jest.fn().mockResolvedValue(userStub()),
});
