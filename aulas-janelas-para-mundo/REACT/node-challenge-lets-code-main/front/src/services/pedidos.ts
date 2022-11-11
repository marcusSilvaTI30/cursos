import api from './api';
import { Funcionario } from './funcionario';
import { Produto } from './produtos';

export interface Pedido {
  id: number;
  vendedor: Funcionario;
  itens: { produto: Produto }[];
  endereco_entrega: string;
  preco_total: string;
  data_pedido: Date;
}

export const findAllPedidos = async () => {
  return api.get<Pedido[]>('/pedido');
};

export const createPedido = async () => {
  // TODO função
};
