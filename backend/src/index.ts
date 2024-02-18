import express, { Express } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { StandardVigenereUseCase } from "./cipher/use-case/standard-vigenere";
import { StandardVigenereController } from "./cipher/controller/standard-vigenere";
import { AutoKeyVigenereUseCase } from "./cipher/use-case/auto-key-vigenere";
import { AutoKeyVigenereController } from "./cipher/controller/auto-key-vigenere";
import { ExtendedVigenereController } from "./cipher/controller/extended-vigenere";
import { ExtendedVigenereUseCase } from "./cipher/use-case/extended-vigenere";
import { PlayfairController } from "./cipher/controller/playfair";
import { PlayfairUseCase } from "./cipher/use-case/playfair";
import { AffineController } from "./cipher/controller/affine";
import { AffineUseCase } from "./cipher/use-case/affine";
import { HillUseCase } from "./cipher/use-case/hill";
import { HillController } from "./cipher/controller/hill";

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

const extendedVigenereUseCase = new ExtendedVigenereUseCase();
const extendedVigenereController = new ExtendedVigenereController(
  extendedVigenereUseCase
);
app.use("/cipher", extendedVigenereController.getRouter());

const playfairUseCase = new PlayfairUseCase();
const playfairController = new PlayfairController(playfairUseCase);
app.use("/cipher", playfairController.getRouter());

const affineUseCase = new AffineUseCase();
const affineController = new AffineController(affineUseCase);
app.use("/cipher", affineController.getRouter());

const hillUseCase = new HillUseCase();
const hillController = new HillController(hillUseCase);
app.use("/cipher", hillController.getRouter());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
