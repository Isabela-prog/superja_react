import { Link } from 'react-router-dom'

function CardCategorias() {
    return (
        <div className='border border-[#d0b75c] flex flex-col rounded-2xl overflow-hidden justify-between shadow-md'>
            <header className='py-2 px-6 bg-[#f7c98f] text-[#1D907D] font-bold text-2xl'>
                Categoria
            </header>

            <p className='p-8 text-3xl bg-[#fdf9f6] text-[#d97667] h-full'>
                Descrição
            </p>

            <div className="flex">
                <Link to='' 
                    className='w-full text-white bg-[#1D907D] hover:bg-[#157465] 
                        flex items-center justify-center py-2 transition-colors'>
                    <button>Editar</button>
                </Link>

                <Link to='' 
                    className='text-white bg-[#d97667] hover:bg-[#b75c50] w-full 
                    flex items-center justify-center py-2 transition-colors'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardCategorias