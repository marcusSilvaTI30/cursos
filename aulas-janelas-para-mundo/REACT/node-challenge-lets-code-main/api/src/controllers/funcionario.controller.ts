import { Request, Response } from 'express';
import { FuncionarioService } from '../services/funcionario.service';

export class FuncionarioController {
  async findAll(request: Request, response: Response) {
    try {
      const funcionarioService = new FuncionarioService();
      const result = await funcionarioService.findAll();
      return response.json(result);
    } catch (error: any) {
      console.log(error);
      return response.json({ error: error.message });
    }
  }

  async findAllGerentes(request: Request, response: Response) {
    try {
      const funcionarioService = new FuncionarioService();
      const result = await funcionarioService.findGerentes();
      return response.json(result);
    } catch (error: any) {
      console.log(error);
      return response.json({ error: error.message });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const funcionarioService = new FuncionarioService();
      const { nome, cargo } = request.body;

      let gerente = request.body.gerente;

      if (gerente) {
        gerente =
          (await funcionarioService.findOneGerente(gerente)) || undefined;
        if (!gerente) {
          return response.status(404).json({ error: 'Gerente não encontrado' });
        }
      }
      const result = await funcionarioService.criarFuncionario({
        nome,
        cargo,
        gerente,
      });

      return response.json(result);
    } catch (error: any) {
      return response.json({ error: error.message });
    }
  }
}
