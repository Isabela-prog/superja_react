import Categoria from "./Categoria";
import Usuario from "./Usuario";

export default interface Produto {
    id?: number | null;
    nomeProduto: string;
    estoque: number;
    preco: number;
    validade: Date;
    categoria?: Categoria | null;
    usuario?: Usuario | null;
}