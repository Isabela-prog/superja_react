import Categoria from "./Categoria";
import Usuario from "./Usuario";

export default interface Produto {
    id?: number | null;
    nomeProduto: string;
    estoque: number;
    preco: number;
    validade: string;
    categoria?: Categoria | null;
    usuario?: Usuario | null;
}