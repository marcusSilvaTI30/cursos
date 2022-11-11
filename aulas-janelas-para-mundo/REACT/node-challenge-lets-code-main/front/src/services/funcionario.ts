import api from './api';

export interface Funcionario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  gerente: Funcionario;
}

export const findAllFuncionario = async () => {
  return api.get<Funcionario[]>('/funcionario');
};

export const findAllGerentes = async () => {
  return api.get<Funcionario[]>('/funcionario/gerentes');
};

export const createFuncionario = async (data: {
  nome: string;
  cargo: string;
  gerente?: string;
}) => {
  return api.post('/funcionario', { ...data });
};
