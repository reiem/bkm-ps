import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { userStub } from './stubs/user.stub';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

jest.mock('./users.service');

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersService],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      const dto = {
        firstName: userStub().firstName,
        lastName: userStub().lastName,
        email: userStub().email,
      };

      beforeEach(async () => {
        user = await resolver.createUser(dto);
      });

      test('it should call usersService.create', () => {
        expect(service.create).toHaveBeenCalledWith(dto);
      });

      test('it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await resolver.findOne(userStub().id);
      });

      test('then it should call findOne on the service', () => {
        expect(service.findOne).toHaveBeenCalledWith(userStub().id);
      });

      test('then it should return the user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await resolver.findAll();
      });

      test('then it should call findAll on the service', () => {
        expect(service.findAll).toHaveBeenCalled();
      });

      test('then it should return the users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User;
      const dto = {
        id: userStub().id,
        firstName: userStub().firstName,
        lastName: userStub().lastName,
        email: userStub().email,
      };

      beforeEach(async () => {
        user = await resolver.updateUser(dto);
      });

      test('it should call usersService.update', () => {
        expect(service.update).toHaveBeenCalledWith(dto.id, dto);
      });

      test('it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('removeUser', () => {
    describe('when removeUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await resolver.removeUser(userStub().id);
      });

      test('it should call usersService.remove', () => {
        expect(service.remove).toHaveBeenCalledWith(userStub().id);
      });

      test('it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
