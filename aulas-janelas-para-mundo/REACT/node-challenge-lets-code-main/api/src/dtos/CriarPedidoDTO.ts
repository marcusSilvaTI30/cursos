import { Funcionario } from "../entities/Funcionario";
import { Produto } from "../entities/Produto";

export default interface CriarPedidoDTO {
    vendedor: Funcionario;
    produtos: Produto[];
    endereco_entrega: string;
    preco_total: number;
    data_pedido: Date;
}