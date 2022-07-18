import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn((userDto) => {
              return {
                id: Date.now(),
                ...userDto,
              };
            }),
            create: jest.fn((userDto) => userDto),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userDTO = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
      }
      const user = await service.create(userDTO);
      expect(user).toEqual({
        id: expect.any(Number),
        ...userDTO,
      });
    });
  });
});
