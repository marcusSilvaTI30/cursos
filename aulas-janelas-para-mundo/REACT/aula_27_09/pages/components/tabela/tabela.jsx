import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove, faEdit } from "@fortawesome/free-solid-svg-icons";
import { CategoriaService } from "./../../services/Categoria";
import {categorias} from "./../../categorias"

export default function Tabela(props) {
  const categoriasLista = [
    { id: 1, descricao: "Padaria" },
    { id: 2, descricao: "Higiene pessoal" },
    { id: 3, descricao: "Limpeza" },
    { id: 4, descricao: "Iorgute" },
  ];

  function renderizarCabecalho() {
    return (
      <tr>
        <th>Código</th>
        <th>Categoria</th>
        <th>Ações</th>
      </tr>
    );
  }

  function renderizarDados() {
    return categoriasLista.map((categoria, i) => {
      return (
        <tr key={categoria.id}>
          <td>{categoria.id}</td>
          <td>{categoria.descricao}</td>
          <td> {renderizarAcoes(categoria)}</td>
        </tr>
      );
    });
  }

  function editar(categoria) {
    console.log("Editar...");

    var x = categoria.id == 1 ? true : false;

    console.log(categoria);
    return "editar";
  }

  function remover(categoria) {
    console.log("Remover...");
    console.log(categoria);
    return "remover";
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
          onClick={() => editar(categoria)}
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
          onClick={() => remover(categoria)}
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
