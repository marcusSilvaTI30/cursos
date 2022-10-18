import styles from "../../../styles/Cabecalho.module.css";

export default function Cabecalho(props) {
  return (
    <div>
      <h1 className={styles.title}>Sistema de Cadastro</h1>
      <h2 className={styles.subtitle}>{props.titulo}</h2>
    </div>
  );
}
