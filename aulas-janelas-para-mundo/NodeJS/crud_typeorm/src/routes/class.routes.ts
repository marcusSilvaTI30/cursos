import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Class } from '../models/Class';

const classRoutes = Router();

classRoutes.get('/categorias', async (request, response) => {
    try {
        const repo = getRepository(Class);
        const resp = await repo.find();

        return response.status(200).json(resp);
    } catch (err) {
        console.log('Erro:cccccccccc ',err);
        return response.status(500);

    }
});

classRoutes.post('/categorias', async (request, response) => {
    try {
        const repo = getRepository(Class);
        const resp = await repo.save(request.body);

        return response.status(201).json(resp);
    } catch (err) {
        console.log('Erro: ',err);
    }
});


classRoutes.delete('/categorias/:id', async (request, response) => {
  try {
      const repo = getRepository(Class);
      const id = request.params.id;

      const resp = await repo.delete(id);

      return response.status(200).json(resp);
  } catch (err) {
      console.log('Erro:cccccccccc ',err);
      return response.status(500);

  }
});

export default classRoutes;
