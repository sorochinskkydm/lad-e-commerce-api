import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../db.js';

export const registerController = async (request, response) => {
  try {
    const { lastname, firstname, surname, email, password } = request.body;
    //Проверка на наличие адреса в БД
    const checkEmail = await pool.query(`select * from users where email = $1`, [email]);
    if (checkEmail.rows.length === 0) {
      //Хэширование пароля
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      //Регистрация пользователя
      const user = await pool.query(
        `insert into users (lastname, firstname, surname, email, user_pass, role_id) values ($1, $2, $3, $4, $5, 1) returning *`,
        [lastname, firstname, surname, email, passwordHash],
      );
      //Создание токена с id пользователя
      const token = jwt.sign(
        {
          id: user.rows[0].id,
        },
        'someDifficultKey',
        {
          expiresIn: '30d',
        },
      );
      response.json({
        message: 'sucessfully registered',
        user: user.rows[0],
        token,
      });
    } else {
      return response.status(403).json({
        message: 'Данный адрес уже занят',
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: 'Не удалось зарегистрироваться',
    });
  }
};

export const authController = async (request, response) => {
  try {
    const { email, password } = request.body;
    //Выборка пользователя из БД
    const user = await pool.query(`select * from users where email = $1`, [email]);
    //Выборка пароля пользователя
    const passwordHash = await pool
      .query(`select user_pass from users where email = $1`, [email])
      .then((result) => result);
    if (!user) {
      return response.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    //Сравнение паролей
    const isValidPassword = await bcrypt.compare(password, passwordHash.rows[0].user_pass);
    if (!isValidPassword) {
      return response.status(404).json({
        message: 'Неверный логин или пароль',
      });
    }
    //Создание нового токена при авторизации
    const token = jwt.sign(
      {
        id: user.rows[0].id,
      },
      'someDifficultKey',
      {
        expiresIn: '30d',
      },
    );
    response.status(200).json({
      message: 'Успешная авторизация',
      user: user.rows[0],
      token,
    });
  } catch (error) {
    console.log(error);
    response.status(404).json({
      message: 'Не удалось авторизоваться',
    });
  }
};
export const getMeController = async (request, response) => {};
