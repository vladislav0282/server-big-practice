import express from "express";
import config from "dotenv/config";
import sequelize from "./sequelize.js";
import * as mapping from "./models/mapping.js";
import cors from "cors";
import router from "./routes/index.js";
import ErrorHandler from "./middleware/ErrorHandler.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000;

const app = express();
// Cross-Origin Resource Sharing
app.use(cors({ origin: "http://localhost:4200", credentials: true }));
// middleware для работы с json
app.use(express.json());
// middleware для статики (img, css)
app.use(express.static("static"));
// middleware для загрузки файлов
app.use(fileUpload());
// все маршруты приложения
app.use("/api/v1", router);
// middleware для работы cookie
app.use(cookieParser(process.env.BASCET_KEY));
// обработка ошибок
app.use(ErrorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log("Сервер запущен на порту", PORT));
  } catch (e) {
    console.log(e);
  }
};

start();
