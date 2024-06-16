import { Transaction } from "./mapping.js";
import AppError from "../errors/AppError.js";

class TransactionModel {
  async getAll() {
    const transactions = await Transaction.findAll();
    return transactions;
  }

  async getOne(id) {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      throw new Error("Transaction не найден в БД");
    }
    return transaction;
  }

  async create(data) {
    const { title, amount, type, category } = data;
    const transaction = await Transaction.create({ title, amount, type, category});
    return transaction;
  }

  async delete(id) {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      throw new Error("Transaction не найден в БД");
    }
    await transaction.destroy();
    return transaction;
  }


  // async getByEmail(email) {
  //   const user = await UserMapping.findOne({ where: { email } });
  //   if (!user) {
  //     //если пользователь не найден, то ошибка
  //     return next(AppError.internal("Пользователь с таким именем не найден"));
  //   }
  //   return user;
  // }

  

  

  // async update(id, data) {
  //   const user = await UserMapping.findByPk(id);
  //   if (!user) {
  //     throw new Error("Пользователь не найден в БД");
  //   }
  //   const {
  //     email = user.email,
  //     password = user.password,
  //     role = user.role,
  //   } = data;
  //   await user.update({ email, password, role });
  //   return user;
  // }

  
}

export default new TransactionModel();
