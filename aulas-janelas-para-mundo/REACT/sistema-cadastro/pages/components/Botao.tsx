import styles from "../../styles/Botao.module.css";

interface BotaoProps {
  cor?: "green" | "red" | "gray" | "blue";
  label?: "white" | "black";
  children: any;
  onClick?: () => void;
}

export default function Botao(props: BotaoProps) {
  return (
    <button className={styles.btn} 
    style={{backgroundColor: props.cor, color: props.label}}
    onClick={props.onClick}>
      {props.children}
    </button>
  );
}
