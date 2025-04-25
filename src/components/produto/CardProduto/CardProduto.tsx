import { Link } from 'react-router-dom'
import Produto from '../../../models/Produto'

interface CardProdutosProps {
    produto: Produto
}

function CardProduto({ produto }: CardProdutosProps) {
    return (
        <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between'>

            <div>
                <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
                    <img
                        src={produto.usuario?.foto || "https://ik.imagekit.io/2zvbvzaqt/vecteezy_user-icon-in-trendy-flat-style-isolated-on-grey-background_5005837.jpg?updatedAt=1744726063905"}
                        className='h-12 rounded-full'
                        alt={produto.usuario?.nome} />
                    <h3 className='text-lg font-bold text-center uppercase'>
                        {produto.usuario?.nome}
                    </h3>
                </div>
                <div className='p-4 '>
                    <h4 className='text-lg font-semibold uppercase'>{produto.nomeProduto}</h4>
                    <p>{produto.preco}</p>
                    <p>Categoria: {produto.categoria?.setor}</p>
                    <p>Data de Validade: {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(produto.validade))}</p>
                </div>
            </div>
            <div className="flex">
                <Link to={`/editarproduto/${produto.id}`}
                    className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
    flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletarproduto/${produto.id}`}
                    className='text-white bg-red-400 
	hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardProduto