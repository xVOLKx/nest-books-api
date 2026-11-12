import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './book.entity';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return books', async () => {
    const books = await service.findAll();
    expect(books).toHaveLength(1);
    expect(books[0].title).toBe('1984');
  });
});