import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Produto from "../../../models/Produto"
import { buscar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { AuthContext } from "../../../context/AuthContext"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarProduto() {
    const navigate = useNavigate()
    const [produto, setProduto] = useState<Produto>({} as Produto)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
                headers: { 'Authorization': token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarProduto() {
        setIsLoading(true)
        try {
            await deletar(`/produtos/${id}`, {
                headers: { 'Authorization': token }
            })
            ToastAlerta('Produto apagado com sucesso', 'sucesso')
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao deletar o produto.', 'erro')
            }
        }
        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/produtos")
    }

    return (
        <div className="container w-full md:w-1/3 mx-auto px-4">
            <h1 className="text-4xl text-center my-6 text-[#1D907D] font-bold">
                Deletar Produto
            </h1>
            <p className="text-center font-semibold mb-4 text-[#d97667]">
                Você tem certeza de que deseja apagar o produto abaixo?
            </p>

            <div className="border border-[#d0b75c] flex flex-col rounded-2xl overflow-hidden shadow-md">
                <header className="py-2 px-6 bg-[#f7c98f] text-[#1D907D] font-bold text-2xl text-center">
                    Produto
                </header>

                <div className="bg-[#fdf9f6]">
                    <p className="p-8 text-3xl text-[#d97667] text-center">{produto.nomeProduto}</p>
                    <p className="text-lg text-center text-[#448476] pb-6">Preço: R$ {produto.preco?.toFixed(2)}</p>
                </div>

                <div className="flex">
                    <button
                        className="w-full text-white bg-red-400 hover:bg-red-700 py-2 transition-all"
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button
                        className="w-full text-white bg-[#1D907D] hover:bg-[#157465] py-2 flex justify-center transition-all"
                        onClick={deletarProduto}
                    >
                        {isLoading ? (
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            />
                        ) : (
                            <span>Sim</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarProduto