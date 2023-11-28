import { body } from 'express-validator';

export const registerValidator = [
  body('lastname', 'Длина поля должна составлять минимум 2 символа').isLength({ min: 2 }),
  body('firstname', 'Длина поля должна составлять минимум 2 символа').isLength({ min: 2 }),
  body('surname', 'Длина поля должна составлять минимум 2 символа').isLength({ min: 2 }),
  body('email', 'Неверная ссылка на изображение').isEmail(),
  body('password', 'Длина поля должна составлять минимум 2 символа').isLength({ min: 2 }),
];

export const authValidator = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен содержать минимум 2 символа').isLength({ min: 2 }),
];

export const updateCustomersValidator = [
  body('lastname', 'Длина поля должна составлять минимум 2 символа').isLength({ min: 2 }),
  body('firstname', 'Длина поля должна составлять минимум 2 символа').isLength({ min: 2 }),
  body('surname', 'Длина поля должна составлять минимум 2 символа').isLength({ min: 2 }),
  body('email', 'Неверная ссылка на изображение').isEmail(),
  body('password', 'Длина поля должна составлять минимум 2 символа').isLength({ min: 2 }),
];

export const addGoodsValidator = [
  body('title', 'Длина поля должна составлять минимум 2 символа').isLength({ min: 2 }),
  body('producer_id', 'Поле не должно быть пустым').notEmpty(),
  body('type_id', 'Поле не должно быть пустым').notEmpty(),
  body('price', 'Поле не должно быть пустым').notEmpty(),
  body('description', 'Длина поля должна составлять минимум 10 символов').isLength({ min: 10 }),
];

export const updateGoodsValidator = [
  body('title', 'Длина поля должна составлять минимум 2 символа').isLength({ min: 2 }),
  body('producer_id', 'Поле не должно быть пустым').notEmpty(),
  body('type_id', 'Поле не должно быть пустым').notEmpty(),
  body('price', 'Поле не должно быть пустым').notEmpty(),
  body('description', 'Длина поля должна составлять минимум 10 символов').isLength({ min: 10 }),
];

export const addToCartValidator = [
  body('good_id', 'Поле не должно быть пустым').notEmpty(),
  body('count', 'Поле не должно быть пустым').notEmpty(),
];

export const updateOrderValidator = [
  body('user_id', 'Поле не должно быть пустым').notEmpty(),
  body('count', 'Поле не должно быть пустым').notEmpty(),
];
