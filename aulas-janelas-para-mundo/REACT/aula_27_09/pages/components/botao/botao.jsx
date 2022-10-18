import styles from "../../../styles/Botao.module.css";

export default function Botao(props) {

  function trocar(){
    alert("sd");
  }

  return <button 
          className={styles.btn}
          style= {{
            background: !props?.corBackground ? "green" : props?.corBackground            
          }}
          onClick={() => trocar()}
          >
            {props?.descricao}
            </button>;
}
