import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { userStub } from './stubs/user.stub';
import { UsersService } from './users.service';
import { UserRepository } from './__mocks__/users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: UserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    describe('when create is called', () => {
      let user: User;
      const dto = {
        firstName: userStub().firstName,
        lastName: userStub().lastName,
        email: userStub().email,
      };

      beforeEach(async () => {
        user = await service.create(dto);
      });

      test('it should call save on the repository', () => {
        expect(repository.save).toHaveBeenCalled();
      });

      test('it should return the user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await service.findAll();
      });

      test('it should call find on the repository', () => {
        expect(repository.find).toHaveBeenCalled();
      });

      test('it should return the users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await service.findOne(userStub().id);
      });

      test('it should call findOneOrFail on the repository', () => {
        expect(repository.findOneOrFail).toHaveBeenCalledWith({
          where: { id: userStub().id },
        });
      });

      test('it should return the user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let user: User;
      const dto = {
        id: userStub().id,
        firstName: userStub().firstName,
        lastName: userStub().lastName,
        email: userStub().email,
      };

      beforeEach(async () => {
        user = await service.update(userStub().id, dto);
      });

      test('it should call preload on the repository', () => {
        expect(repository.preload).toHaveBeenCalledWith({
          id: userStub().id,
          ...dto,
        });
      });

      test('it should call save on the repository', () => {
        expect(repository.save).toHaveBeenCalled();
      });

      test('it should return the user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('remove', () => {
    describe('when remove is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await service.remove(userStub().id);
      });

      test('it should call softRemove on the repository', () => {
        expect(repository.softRemove).toHaveBeenCalledWith(userStub());
      });

      test('it should return the user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
