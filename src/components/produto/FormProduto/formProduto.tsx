import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import Categoria from "../../../models/Categoria";
import { AuthContext } from "../../../context/AuthContext";
import Produto from "../../../models/Produto";

function FormProduto() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<Categoria>({ id: 0, setor: "" });
  const [produto, setProduto] = useState<Produto>({} as Produto);
  const [desconto, setDesconto] = useState<string>('');

  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarProdutoPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) handleLogout();
    }
  }

  async function buscarCategoriaPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) handleLogout();
    }
  }

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) handleLogout();
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarCategorias();
    if (id !== undefined) buscarProdutoPorId(id);
  }, [id]);

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
    });
  }, [categoria]);

  function verificarDesconto(preco: string) {
    const precoNum = parseFloat(preco);  // Converte para número
    if (!isNaN(precoNum) && precoNum > 50.01) {
      setDesconto("Esse produto tem um desconto de 10%!");
    } else {
      setDesconto('');
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
  
    // Atualiza o estado do produto com o valor do input
    setProduto({
      ...produto,
      [name]: value,
      categoria: categoria,
      usuario: usuario,
    });
  
    // Verifica o desconto apenas quando o campo alterado for 'preco'
    if (name === 'preco') {
      verificarDesconto(value);  // Chama a função de desconto com o valor do preço
    }
  }

  function retornar() {
    navigate("/produtos");
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        await atualizar(`/produtos`, produto, setProduto, {
          headers: { Authorization: token },
        });
        ToastAlerta("Produto atualizado com sucesso", "sucesso");
      } else {
        await cadastrar(`/produtos`, produto, setProduto, {
          headers: { Authorization: token },
        });
        ToastAlerta("Produto cadastrado com sucesso", "sucesso");
      }
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao salvar o Produto", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoCategoria = categoria.setor === "";


  return (
    <div className="container flex flex-col mx-auto items-center px-4">
      <h1 className="text-4xl text-center font-bold text-[#1D907D] my-8">
        {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
      </h1>

      <form
        onSubmit={gerarNovoProduto}
        className="w-full md:w-1/2 flex flex-col gap-6 bg-white border border-[#d0b75c] rounded-2xl p-6 shadow-md"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="nomeProduto" className="text-[#4B2142] font-semibold">
            Nome do Produto
          </label>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            name="nomeProduto"
            required
            className="border-2 border-[#f7c98f] rounded p-2 focus:outline-[#1D907D]"
            value={produto.nomeProduto}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="preco" className="text-[#4B2142] font-semibold">
            Preço do Produto
          </label>
          <input
            type="text"
            placeholder="Digite o preço"
            name="preco"
            required
            className="border-2 border-[#f7c98f] rounded p-2 focus:outline-[#1D907D]"
            value={produto.preco}
            onChange={atualizarEstado}
            
          />
         {desconto && <p className="text-red-500 font-semibold">{desconto}</p>} {/* Exibe o desconto */}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="validade" className="text-[#4B2142] font-semibold">
            Validade do Produto
          </label>
          <input
            type="date"
            name="validade"
            required
            className="border-2 border-[#f7c98f] rounded p-2 focus:outline-[#1D907D]"
            value={produto.validade}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="categoria" className="text-[#4B2142] font-semibold">
            Categoria do Produto
          </label>
          <select
            name="categoria"
            id="categoria"
            className="border-2 border-[#f7c98f] rounded p-2 focus:outline-[#1D907D]"
            onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
          >
            <option value="" disabled selected>
              Selecione uma Categoria
            </option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id!}>
                {categoria.setor}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-[#1D907D] hover:bg-[#157465] text-white font-semibold rounded py-2 w-1/2 mx-auto flex justify-center transition-all disabled:bg-slate-300"
          disabled={carregandoCategoria}
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
            <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormProduto;
