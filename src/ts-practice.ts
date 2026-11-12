import { promises } from "dns";

// ===== ДЖЕНЕРИКИ =====
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const numbers = wrapInArray(42);    // number[]
const strings = wrapInArray('hi');  // string[]

// ===== УТИЛИТАРНЫЕ ТИПЫ =====
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial — все поля опциональны
type UserPartial = Partial<User>;

// Pick — выбираем только нужные поля
type UserShort = Pick<User, 'id' | 'name'>;
// Omit — исключаем поля
type UserWithoutEmail = Omit<User, 'email'>;

// Readonly — только для чтения
type UserReadonly = Readonly<User>;

// ===== ДЕКОРАТОРЫ (в NestJS) =====
// В NestJS декораторы выглядят так:
// @Controller('books')
// @Get()
// @Post()
// @Injectable()
// Они уже используются в нашем проекте.

// ===== Новые Примеры =====

// Дженерик - возврощает первый элемент массива
function getFirst<T>(arr: T[]): T |undefined {
    return arr [0];
}

const firstNumber = getFirst([1, 2, 3]); // 1
const firstString = getFirst(['a', 'b', 'c']); // 'a'

// ===== Работа С ПРОДУКТАМИ =====
interface Product {
    id: number;
    name: string;
    price: number;
}

// Pick - только id и name
type ProductShort = Pick<Product, 'id' | 'name'>;

// Omit - без price 
type ProductWithoutPrice = Omit<Product, 'price'>;

// Partial - все поля опциональны 
type ProductUpdate = Partial<Product>;

// Readonly - нельзя менять 
type ProductReadonly = Readonly<Product>;

// Создаём продукт
const product: Product = { id: 1, name: 'Ноутбук', price: 50000};

// Используем Pick
const short: ProductShort = { id: 1, name: 'Ноутбук'};

// Используем Pratial - можно не указывать цену 

const update: ProductUpdate = { name: 'Ноутбук Pro'};