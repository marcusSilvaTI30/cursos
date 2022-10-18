import Head from "next/head";
import Cabecalho from "./components/cabecalho/cabecalho";
import Tabela from "./components/tabela/tabela";
import styles from "../styles/Categoria.module.css";
import {useState} from "react";

export default function categorias() {
  const categoria = {descricao: ''};

  categoria.descricao = "teste";

  const [tabelaVisivel, setStatusForm] = useState(true);

  function salvar(categoria) {
    console.log(categoria)
  }

  function trocarStatusForm(status) {
    setStatusForm(status)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Categorias</title>
        <meta name="description" content="Hello world!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Cabecalho titulo="Categorias"></Cabecalho>
        <div className={styles.align_btn}>
          <button
            style={{
              width: "100px",
              backgroundColor: "green",
              color: "white",
              display: "inline-block",
              fontSize: "15px",
              borderColor: "transparent",
              marginRight: "10px",
              padding: "10px 10px",
              cursor: "pointer",
            }}
            onClick={() => trocarStatusForm(false)}
          >
            Cadastrar
          </button>
        </div>

        {!tabelaVisivel ? (
          <form
            style={{
              marginLeft: "320px",
            }}
          >
            <label>
              Categoria: <br />
              <input
                type="text"
                value={categoria.descricao}
                style={{
                  width: "1000px",
                  height: "30px",
                  marginTop: "10px",
                  borderRadius: "10px",
                }}
              />
            </label>
            <br />
            <br />

            <div
              style={{
                width: "1000px",
                textAlign: "end",
              }}
            >
              <input
                type="button"
                value="Cancelar"
                style={{
                  width: "100px",
                  backgroundColor: "red",
                  color: "white",
                  display: "inline-block",
                  fontSize: "15px",
                  borderColor: "transparent",
                  marginRight: "10px",
                  padding: "10px 10px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
                onClick={() => trocarStatusForm(true)}
              />
              <input
                type="button"
                value="Salvar"
                style={{
                  width: "100px",
                  backgroundColor: "green",
                  color: "white",
                  display: "inline-block",
                  fontSize: "15px",
                  borderColor: "transparent",
                  marginRight: "10px",
                  padding: "10px 10px",
                  borderRadius: "20px",
                  cursor: "pointer"
                }}
                onClick={() => salvar(categoria)}
              />
            </div>
          </form>
        ) : (
          <Tabela statusFormulario={trocarStatusForm.bind(this)}></Tabela>
        )}
      </main>
    </div>
  );
}
