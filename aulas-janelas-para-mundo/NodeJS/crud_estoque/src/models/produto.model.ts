import Categoria from "./categoria.model";
import Fornecedor from "./fornecedor.model";

type Produto = {
    id_produto?: number,
    descricao?: string,
    preco_unitario?: number,
    quantidade_estoque?: number,
    categoria: Categoria,
    fornecedor: Fornecedor
}

export default Produto;