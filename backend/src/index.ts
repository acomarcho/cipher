import express, { Express } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { StandardVigenereUseCase } from "./cipher/use-case/standard-vigenere";
import { StandardVigenereController } from "./cipher/controller/standard-vigenere";
import { AutoKeyVigenereUseCase } from "./cipher/use-case/auto-key-vigenere";
import { AutoKeyVigenereController } from "./cipher/controller/auto-key-vigenere";

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const standardVigenereUseCase = new StandardVigenereUseCase();
const standardVigenereController = new StandardVigenereController(
  standardVigenereUseCase
);
app.use("/cipher", standardVigenereController.getRouter());

const autoKeyVigenereUseCase = new AutoKeyVigenereUseCase();
const autoKeyVigenereController = new AutoKeyVigenereController(
  autoKeyVigenereUseCase
);
app.use("/cipher", autoKeyVigenereController.getRouter());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
