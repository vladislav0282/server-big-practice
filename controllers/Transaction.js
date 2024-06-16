import TransactionModel from "../models/TransactionModel.js";

import AppError from "../errors/AppError.js";



class TransactionController {

  async getAll(req, res, next) {
    try {
      const transactions = await TransactionModel.getAll();
      res.json(transactions);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error("Не указан id transaction");
      }
      const transaction = await TransactionModel.getOne(req.params.id);
      res.json(transaction);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    const { title, amount, type, category } = req.body;
    try {
      if (!title || !amount || !type ) {
        throw new Error("Пустой title, amount, type");
      }
      const transaction = await TransactionModel.create({ title, amount, type, category});
      return res.json(transaction);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error("Не указан id transaction");
      }
      const transaction = await TransactionModel.delete(req.params.id);
      res.json(transaction);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }




  // async signup(req, res, next) {
  //   const { email, password, id, role = "USER" } = req.body;
  //   try {
  //     if (!email || !password) {
  //       throw new Error("Пустой email или пароль");
  //     }
  //     if (role !== "USER") {
  //       throw new Error("Возможна только роль USER");
  //     }
  //     const hash = await bcrypt.hash(password, 5);
  //     const user = await UserModel.create({ email, password: hash, role });
  //     const token = makeJwt(user.id, user.email, user.role);
  //     return res.json({ token, email, id });
  //   } catch (e) {
  //     next(AppError.badRequest(e.message));
  //   }
  // }

  // async login(req, res, next) {
  //   try {
  //     const { email, password, id } = req.body;
  //     const user = await UserModel.getByEmail(email);
  //     let compare = bcrypt.compareSync(password, user.password);
  //     if (!compare) {
  //       throw new Error("Указан неверный пароль");
  //     }
  //     const token = makeJwt(user.id, user.email, user.role);
  //     return res.json({ token, email, id });
  //   } catch (e) {
  //     next(AppError.badRequest(e.message));
  //   }
  // }

  

  

  // async update(req, res, next) {
  //   try {
  //     if (!req.params.id) {
  //       throw new Error("Не указан id пользователя");
  //     }
  //     if (Object.keys(req.body).length === 0) {
  //       throw new Error("Нет данных для обновления");
  //     }
  //     let { email, password, role } = req.body;
  //     if (role && !["USER", "ADMIN"].includes(role)) {
  //       throw new Error("Недопустимое значение роли");
  //     }
  //     if (password) {
  //       password = await bcrypt.hash(password, 5);
  //     }
  //     const user = await UserModel.update(req.params.id, {
  //       email,
  //       password,
  //       role,
  //     });
  //     res.json(user);
  //   } catch (e) {
  //     next(AppError.badRequest(e.message));
  //   }
  // }

}

export default new TransactionController();
