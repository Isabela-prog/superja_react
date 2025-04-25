import { Link } from 'react-router-dom'
import Produto from '../../../models/Produto'

interface CardProdutosProps {
  produto: Produto
}

function CardProduto({ produto }: CardProdutosProps) {
  return (
    <div className="border border-[#d0b75c] rounded-2xl shadow-md overflow-hidden flex flex-col justify-between transition-transform hover:scale-105">
      {/* Cabeçalho com usuário */}
      <div className="flex items-center gap-4 bg-[#f7c98f] py-3 px-6">
        <img
          src={
            produto.usuario?.foto ||
            "https://ik.imagekit.io/2zvbvzaqt/vecteezy_user-icon-in-trendy-flat-style-isolated-on-grey-background_5005837.jpg?updatedAt=1744726063905"
          }
          className="h-12 w-12 rounded-full object-cover"
          alt={produto.usuario?.nome}
        />
        <h3 className="text-[#1D907D] text-lg font-bold uppercase">
          {produto.usuario?.nome}
        </h3>
      </div>

      {/* Informações do produto */}
      <div className="p-6 bg-[#fdf9f6] text-[#4B2142] flex flex-col gap-2">
        <h4 className="text-2xl font-semibold uppercase text-[#d97667]">
          {produto.nomeProduto}
        </h4>
        <p className="text-lg">💰 Preço: {produto.preco.toLocaleString('pt-BR', {
            style:'currency',
            currency:'BRL'
        })}</p>
        <p className="text-lg">🏷️ Categoria: {produto.categoria?.setor}</p>
        <p className="text-lg">
          📅 Validade:{" "}
          {new Intl.DateTimeFormat(undefined, {
            dateStyle: "short",
          }).format(new Date(produto.validade))}
        </p>
      </div>

      {/* Ações */}
      <div className="flex">
        <Link
          to={`/editarproduto/${produto.id}`}
          className="w-full text-white bg-[#1D907D] hover:bg-[#157465] flex items-center justify-center py-2 transition-colors"
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletarproduto/${produto.id}`}
          className="w-full text-white bg-red-400 hover:bg-red-700 flex items-center justify-center transition-colors"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  )
}

export default CardProduto
