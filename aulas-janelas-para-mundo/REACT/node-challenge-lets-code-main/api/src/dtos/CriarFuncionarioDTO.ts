import { Cargo, Funcionario } from "../entities/Funcionario";

export default interface CriarFuncionarioDTO {
    nome: string;
    cargo: Cargo;
    gerente?: Funcionario;
}