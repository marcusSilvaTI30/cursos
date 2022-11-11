import { Repository } from 'typeorm';
import { typeorm } from '../data/data-source';
import CriarFuncionarioDTO from '../dtos/CriarFuncionarioDTO';
import { Cargo, Funcionario } from '../entities/Funcionario';

export class FuncionarioService {
  private funcionarioRepository: Repository<Funcionario>;

  constructor() {
    this.funcionarioRepository = typeorm.getRepository(Funcionario);
  }

  async findAll() {
    return this.funcionarioRepository.find({ relations: ['gerente'] });
  }

  async find(funcionarioId: number): Promise<Funcionario | null> {
    return this.funcionarioRepository.findOne({ where: { id: funcionarioId } });
  }

  async findGerentes(): Promise<Funcionario[]> {
    return this.funcionarioRepository.find({ where: { cargo: Cargo.Gerente } });
  }

  async findOneGerente(funcionarioId: number): Promise<Funcionario | null> {
    return this.funcionarioRepository.findOne({
      where: { id: funcionarioId, cargo: Cargo.Gerente },
    });
  }

  async criarFuncionario(funcionario: CriarFuncionarioDTO) {
    return this.funcionarioRepository.save(funcionario);
  }
}
