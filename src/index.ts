import express, { Request, Response } from "express";
import { userRouter } from "./router/userRouter";

const app = express();

app.use(express.json());

app.use('/user', userRouter)
app.use('/', (req: Request, res: Response) => {
  res.status(404).send({message: 'Endpoint não encontrado'})
})

export default app;
