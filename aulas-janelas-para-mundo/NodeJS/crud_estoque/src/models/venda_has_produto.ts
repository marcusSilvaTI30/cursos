import Produto from "./produto.model";
import Venda from "./venda.model";

type VendaHasProduto = {
    cod_fiscal?: string,
    produto: Produto,
    venda: Venda
}

export default VendaHasProduto;