import Botao from "./components/Botao";
import Formulario from "./components/Formulario";
import Layout from "./components/Layout";
import Tabela from "./components/Tabela";
import Categoria from "./core/Categoria";
import { useState } from "react";

export default function Home() {
  const categoriasList = [
    new Categoria(0, "Higiene Pessoal"),
    new Categoria(1, "Hortifruti"),
    new Categoria(2, "Padaria"),
  ];

  const [categoria, setCategoria] = useState<Categoria>(Categoria.vazio());
  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela");

  function categoriaSelecionada(categoria: Categoria) {
    console.log(`Categoria selecionada>>>> ${categoria.descricao}`);
    setCategoria(categoria);
    setVisivel("form");
  }

  function categoriaExcluida(categoria: Categoria) {
    console.log(`Categoria excluída>>>> ${categoria.descricao}`);
  }

  function novaCategoria() {
    setCategoria(Categoria.vazio());
    setVisivel("form");
  }

  function salvar(categoria: Categoria) {
    console.log(categoria);
    setVisivel("tabela");
  }

  return (
    <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "120px" }}>
      <Layout titulo="Cadastro Simples">
        {visivel === "tabela" ? (
          <>
            <br />
            <Botao onClick={novaCategoria} cor="green" label="white">
              Nova Categoria
            </Botao>
            <br /><br />
            <Tabela
              categorias={categoriasList}
              categoriaSelecionada={categoriaSelecionada}
              categoriaExcluida={categoriaExcluida}
            ></Tabela>
          </>
        ) : (
          <Formulario
            categoria={categoria}
            categoriaMudou={salvar}
            cancelado={() => setVisivel("tabela")}
          ></Formulario>
        )}
      </Layout>
    </div>
  );
}
