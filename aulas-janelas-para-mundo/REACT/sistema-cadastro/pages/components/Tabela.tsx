import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove, faEdit } from "@fortawesome/free-solid-svg-icons";

import Categoria from "../core/Categoria";

interface TabelaProps {
  categorias: Categoria[];
  categoriaSelecionada?: (categoria: Categoria) => void;
  categoriaExcluida?: (categoria: Categoria) => void;
}

export default function Tabela(props: TabelaProps) {
  const categorias = props.categorias;
  const exibirAcoes = props.categoriaExcluida || props.categoriaSelecionada;

  function renderizarCabecalho() {
    return (
      <tr>
        <th>Código</th>
        <th>Categoria</th>
        {exibirAcoes ? <th>Ações</th> : false}
      </tr>
    );
  }

  function renderizarDados() {
    return categorias.map((categoria, i) => {
      return (
        <tr key={categoria.id}>
          <td>{categoria.id}</td>
          <td>{categoria.descricao}</td>
          {exibirAcoes ? <td> {renderizarAcoes(categoria)}</td> : false}
        </tr>
      );
    });
  }
  
  function renderizarAcoes(categoria) {
    return (
      <div>
        <button
          style={{
            width: "50px",
            marginRight: "2px",
            borderColor: "transparent",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          onClick={() => props.categoriaSelecionada?.(categoria)}
        >
          <FontAwesomeIcon
            icon={faEdit}
            style={{
              width: "20px",
              color: "green",
            }}
          />
        </button>

        <button
          style={{
            width: "30px",
            borderColor: "transparent",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          onClick={() => props.categoriaExcluida?.(categoria)}
        >
          <FontAwesomeIcon
            icon={faRemove}
            style={{
              color: "red",
            }}
          />
        </button>
      </div>
    );
  }

  return (
    <table>
      <thead>{renderizarCabecalho()}</thead>
      <tbody>{renderizarDados()}</tbody>
    </table>
  );
}
