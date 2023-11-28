import { pool } from '../db.js';
import jwt from 'jsonwebtoken';

export const addToCart = async (request, response) => {
  try {
    const token = (request.headers.authorization || '').replace(/Bearer\s/, '');
    const decodedToken = jwt.decode(token, 'someDifficultKey');
    const user_id = decodedToken.id;
    const { good_id, count } = request.body;
    const good = await pool.query(
      `insert into cart (user_id, good_id, count) values ($1, $2, $3)`,
      [user_id, good_id, count],
    );
    return response.status(200).json({
      message: 'success',
      good: good.rows[0],
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось добавить товар в корзину',
    });
  }
};

export const getCart = async (request, response) => {
  try {
    const token = (request.headers.authorization || '').replace(/Bearer\s/, '');
    const decodedToken = jwt.decode(token, 'someDifficultKey');
    const user_id = decodedToken.id;
    const data = [];
    const cart = await pool
      .query(`select * from cart where user_id=$1`, [user_id])
      .then((result) => result.rows.map((item) => data.push(item)));
    return response.status(200).json({
      message: 'success',
      cart: data,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось получить содержимое корзины',
    });
  }
};
