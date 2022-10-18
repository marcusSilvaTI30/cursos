import { useState } from "react";
import Categoria from "../core/Categoria";
import Botao from "./Botao";
import Entrada from "./Entrada";

interface FormularioProps {
  categoria: Categoria;
  cancelado?: () => void;
  categoriaMudou?: (categoria: Categoria) => void;
}

export default function Formulario(props: FormularioProps) {
  const id = props.categoria?.id;
  const [nome, setDescricao] = useState(props.categoria?.descricao ?? "");
  return (
    <div style={{marginLeft: "2%", marginTop:"25px"}}>
      <div style={{marginBottom: "20px"}}>
        <Entrada texto="ID" valor={id} somenteLeitura></Entrada>
        <br />
        <Entrada
          texto="Descrição"
          valor={nome}
          valorMudou={setDescricao}
        ></Entrada>
      </div>
      <Botao
        cor="blue"
        label="white"
        onClick={() => props.categoriaMudou?.(new Categoria(id, nome))}
      >
        {id ? "Alterar" : "Salvar"}
      </Botao>
      <Botao cor="red" label="white" onClick={props.cancelado}>
        Cancelar
      </Botao>
    </div>
  );
}
