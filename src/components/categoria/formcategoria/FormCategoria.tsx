import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { AuthContext } from "../../../context/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormCategoria() {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) handleLogout();
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) buscarPorId(id);
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/categorias");
  }

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        await atualizar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token },
        });
        ToastAlerta("A Categoria foi atualizada com sucesso!", "sucesso");
      } else {
        await cadastrar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token },
        });
        ToastAlerta("A Categoria foi cadastrada com sucesso!", "sucesso");
      }
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao salvar a categoria.", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto px-4">
      <h1 className="text-4xl font-bold text-center text-[#1D907D] my-8">
        {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
      </h1>

      <form
        className="w-full md:w-1/2 bg-white border border-[#d0b75c] rounded-2xl p-6 shadow-md flex flex-col gap-6"
        onSubmit={gerarNovaCategoria}
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="setor"
            className="text-[#4B2142] font-semibold"
          >
            Setor da Categoria
          </label>
          <input
            type="text"
            placeholder="Descreva aqui sua categoria"
            name="setor"
            className="border-2 border-[#f7c98f] rounded p-2 focus:outline-[#1D907D]"
            value={categoria.setor}
            onChange={atualizarEstado}
          />
        </div>

        <button
          className="bg-[#1D907D] hover:bg-[#157465] text-white font-semibold rounded py-2 w-1/2 mx-auto flex justify-center transition-all"
          type="submit"
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
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormCategoria;
