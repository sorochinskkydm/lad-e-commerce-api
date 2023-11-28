import { pool } from '../db.js';
import { validationResult } from 'express-validator';

export const getCustomers = async (request, response) => {
  try {
    const data = [];
    const customers = await pool.query(`select * from users`).then((result) => {
      result.rows.map((item) => data.push(item));
    });
    return response.status(200).json({
      message: 'success',
      data,
    });
  } catch (error) {
    console.log(error);
    response.status(404).json({
      message: 'Не удалось получить список покупателей',
    });
  }
};

export const getCustomerById = async (request, response) => {
  try {
    const id = request.params.id;
    const customer = await pool.query(`select * from users where id=$1`, [id]);
    response.status(200).json({
      message: 'success',
      customer: customer.rows[0],
    });
  } catch (error) {
    console.log(error);
    response.status(404).json({
      message: 'Не удалось получить данные покупателя',
    });
  }
};

export const updateCustomer = async (request, response) => {
  try {
    //Проверка правильности ввода данных
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json(errors.array());
    }
    const id = request.params.id;
    const { lastname, firstname, surname, email, password } = request.body;
    const customer = await pool.query(
      `update users set lastname=$1, firstname=$2, surname=$3, email=$4, user_pass=$5 where id=$6`,
      [lastname, firstname, surname, email, password, id],
    );
    response.status(200).json({
      message: 'successfully updated',
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось поменять данные покупателя',
    });
  }
};

export const deleteCustomer = async (request, response) => {
  try {
    const id = request.params.id;
    const customer = await pool.query('delete from users where id=$1', [id]);
    response.status(200).json({
      message: 'successfully deleted',
      customer,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось удалить данные покупателя',
    });
  }
};
