import { Router } from 'express';
import { request } from 'http';
import { getRepository } from 'typeorm';
import { User } from '../models/Users';

const userRoutes = Router();

userRoutes.get('/usuarios', async (request, response) => {
  try {
    const repo = getRepository(User);
    const resp = await repo.find();

    return response.status(200).json(resp);
  } catch (error) {
    console.log('Erro', error);
  }
});

userRoutes.get('/usuarios/:id', async (request, response) => {
  try {
    const repo = getRepository(User);
    const id:any = request.params.id;

    const resp = await repo.findOne(id);

    return response.status(200).json(resp);
  } catch (error) {
    console.log('Erro', error);
  }
});

userRoutes.post('/usuarios', async (request, response) => {
  try {
    const repo = getRepository(User);
    const resp = await repo.save(request.body);

    return response.status(201).json(request.body);
  } catch (error) {
    console.log('Erro', error);
  }
});

userRoutes.put('/usuarios/:id', async (request, response) => {
  try {
    const id = request.body.id;

    const repo = getRepository(User);
    const resp = await repo.update(id, request.body);

    return response.status(200).json(request.body);
  } catch (error) {
    console.log('Erro', error);
  }
});


userRoutes.delete('/usuarios/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const repositorio = getRepository(User);
    const resp = await repositorio.delete(id);

    return response.status(200).json("o usuário foi excluído com sucesso!!");
  } catch (error) {
    console.log('Erro', error);
  }
});

export default userRoutes;
