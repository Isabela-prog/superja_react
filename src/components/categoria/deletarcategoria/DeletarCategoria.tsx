import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Categoria from "../../../models/Categoria"
import { buscar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { AuthContext } from "../../../context/AuthContext"

function DeletarCategoria() {
  const navigate = useNavigate()
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: {
          Authorization: token,
        },
      })
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado")
      navigate("/")
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  async function deletarCategoria() {
    setIsLoading(true)
    try {
      await deletar(`/categorias/${id}`, {
        headers: { Authorization: token },
      })
      alert("Categoria apagada com sucesso")
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout()
      } else {
        alert("Erro ao deletar a categoria.")
      }
    }
    setIsLoading(false)
    retornar()
  }

  function retornar() {
    navigate("/categorias")
  }

  return (
    <div className="container w-full md:w-1/3 mx-auto px-4">
      <h1 className="text-4xl text-center my-6 text-[#1D907D] font-bold">
        Deletar Categoria
      </h1>
      <p className="text-center font-semibold mb-4 text-[#d97667]">
        Você tem certeza de que deseja apagar a categoria abaixo?
      </p>

      <div className="border border-[#d0b75c] flex flex-col rounded-2xl overflow-hidden shadow-md">
        <header className="py-2 px-6 bg-[#f7c98f] text-[#1D907D] font-bold text-2xl text-center">
          Categoria
        </header>

        <p className="p-8 text-3xl bg-[#fdf9f6] text-[#d97667] h-full text-center">
          {categoria.setor}
        </p>

        <div className="flex">
          <button
            className="w-full text-white bg-red-400 hover:bg-red-700 py-2 transition-all"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="w-full text-white bg-[#1D907D] hover:bg-[#157465] py-2 flex justify-center transition-all"
            onClick={deletarCategoria}
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

export default DeletarCategoria
