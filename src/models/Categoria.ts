import Produto from "./Produto";

export default interface Categoria {
    id?: number | null;
    setor: string;
    produto?: Produto[] | null;
}