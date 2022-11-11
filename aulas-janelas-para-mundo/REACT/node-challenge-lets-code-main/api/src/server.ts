import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { typeorm } from './data/data-source';
import { populaBanco } from './data/seeder';

typeorm
  .initialize()
  .then(() => {
    console.log('Conexão com banco iniciada');

    populaBanco().then(() => {
      const app = express();
      const port = '3002';

      app.use(cors());
      app.use(express.json());
      app.use(router);

      app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
      });
    });
  })
  .catch((err) => {
    console.error('Erro durante conexão com banco', err);
  });
