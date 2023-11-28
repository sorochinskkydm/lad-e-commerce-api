import { pool } from '../db.js';
import jwt from 'jsonwebtoken';
import { v1 } from 'uuid';
import { validationResult } from 'express-validator';

export const createAnOrder = async (request, response) => {
  try {
    const token = (request.headers.authorization || '').replace(/Bearer\s/, '');
    const decodedToken = jwt.decode(token, 'someDifficultKey');
    const user_id = decodedToken.id;
    let data = [];
    const cart = await pool.query(`select * from cart where user_id=$1`, [user_id]);
    cart.rows.map((item) =>
      data.push({
        user_id: item.user_id,
        good_id: item.good_id,
        count: item.count,
        date: new Date().toISOString(),
        order_id: v1(),
      }),
    );

    data.forEach(async (x) => {
      const toOrder = await pool.query(
        `insert into orders (user_id, good_id, count, date, order_id) values ($1, $2, $3, $4, $5)`,
        Object.values(x),
      );
    });

    data = null;

    await pool.query(`delete from cart where user_id = $1`, [user_id]);

    return response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось сформировать заказ',
    });
  }
};

export const getOrdersById = async (request, response) => {
  try {
    const id = request.params.id;
    const data = [];
    const orders = await pool.query(`select * from orders where user_id=$1`, [id]);
    orders.rows.map((item) => data.push(item));
    return response.status(200).json({
      message: 'success',
      data,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось получить список заказов',
    });
  }
};

export const getOrders = async (request, response) => {
  try {
    const data = [];
    const orders = await pool.query(`select * from orders`);
    orders.rows.map((item) => data.push(item));
    return response.status(200).json({
      message: 'success',
      data,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось получить список заказов',
    });
  }
};

export const updateOrder = async (request, response) => {
  try {
    //Проверка правильности ввода данных
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json(errors.array());
    }
    const id = request.params.id;
    const { user_id, count } = request.body;
    const orders = await pool.query(`update orders set user_id = $1, count = $2 where id = $3`, [
      user_id,
      count,
      id,
    ]);
    return response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось обновить заказ',
    });
  }
};

export const deleteOrder = async (request, response) => {
  try {
    const id = request.params.id;
    const orders = await pool.query(`delete from orders where order_id = $1`, [id]);
    return response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось удалить заказ',
    });
  }
};
