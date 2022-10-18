import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove, faEdit } from "@fortawesome/free-solid-svg-icons";


export default function Aluno01() {
  return (
    <div>
      <FontAwesomeIcon icon={faEdit} />
      <FontAwesomeIcon icon={faRemove} />
    </div>
  );
}
