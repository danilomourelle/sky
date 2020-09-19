import app from "./index";
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 5000

const server = app.listen(port, () => {
  if (server) {
    console.log(`Servidor rodando em http://localhost:${port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});
