import Cliente from "./cliente.model";
import Pagamento from "./pagamento.model";
import Produto from "./produto.model";
import VendaHasProduto from "./venda_has_produto";
import Vendedor from "./vendedor.model";

type Venda = {
    id_venda?: number,
    quantidade_venda?: number,
    valor_total?: number,
    cliente?: Cliente,
    vendedor?: Vendedor,
    pagamento?: Pagamento,
    produto?: Produto,
    vendaHasProduto?: VendaHasProduto,
    data_venda?: string    
}

export default Venda;