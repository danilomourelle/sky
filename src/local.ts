import app from "./index";
import dotenv from 'dotenv'
import { AddressInfo } from "net";

dotenv.config()

const server = app.listen(3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});
