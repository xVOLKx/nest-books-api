import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './book.entity';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            find: jest.fn().mockResolvedValue([{ id: 1, title: '1984', author: 'Джордж Оруэлл' }]),
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest.fn().mockResolvedValue({ id: 1, title: '1984', author: 'Джордж Оруэлл' }),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});