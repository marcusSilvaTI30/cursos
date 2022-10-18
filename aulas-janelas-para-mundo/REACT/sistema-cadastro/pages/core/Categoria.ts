export default class Categoria {
  #id: number;
  #descricao: string;

  constructor(id: number, descricao: string) {
    this.#id = id;
    this.#descricao = descricao;
  }

  static vazio() {
    return new Categoria(undefined, '');
  }

  get id() {
    return this.#id;
  }

  get descricao() {
    return this.#descricao;
  }
}
