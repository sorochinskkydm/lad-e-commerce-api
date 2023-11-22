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
