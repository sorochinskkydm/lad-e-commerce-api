import { pool } from '../db.js';

export const getGoods = async (request, response) => {
  try {
    const data = [];
    const goods = await pool.query(`select * from goods`);
    goods.rows.map((item) => data.push(item));
    response.json({
      message: 'success',
      goods: data,
    });
  } catch (error) {
    console.log(error);
    response.status(404).json({
      message: 'Не удалось получить список товаров',
    });
  }
};

export const getGoodById = async (request, response) => {
  try {
    const id = request.params.id;
    const goodById = await pool.query(`select * from goods where id=$1`, [id]);
    response.json({
      message: 'success',
      data: goodById.rows[0],
    });
  } catch (error) {
    console.log(error);
    response.status(404).json({
      message: 'Не удалось получить список товаров',
    });
  }
};

export const addGoods = async (request, response) => {
  try {
    const { title, producer_id, type_id, price, description } = request.body;
    const good = await pool.query(
      `insert into goods (title, producer_id, type_id, price, description) values ($1, $2, $3, $4, $5)`,
      [title, producer_id, type_id, price, description],
    );
    return response.status(200).json({
      message: 'success',
      goods: good.rows[0],
    });
  } catch (error) {
    console.log(error);
    response.status(404).json({
      message: 'Не удалось добавить товар',
    });
  }
};
export const updateGoods = async (request, response) => {
  try {
    const id = request.params.id;
    const { title, producer_id, type_id, price, description } = request.body;
    const goods = await pool.query(
      `update goods set title=$1, producer_id=$2, type_id=$3, price=$4, description=$5 where id=$6`,
      [title, producer_id, type_id, price, description, id],
    );
    response.status(200).json({
      message: 'successfully updated',
    });
  } catch (error) {
    console.log(error);
    response.status(404).json({
      message: 'Не удалось обновить товар',
    });
  }
};
export const removeGoods = async (request, response) => {
  try {
    const id = request.params.id;
    const goods = await pool.query('delete from goods where id=$1', [id]);
    response.status(200).json({
      message: 'successfully deleted',
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось удалить товар',
    });
  }
};
