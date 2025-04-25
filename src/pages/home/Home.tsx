import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="bg-[#fdcb8e] min-h-screen flex flex-col justify-between">
      <div className="flex justify-center">
        <div className="container grid grid-cols-1 lg:grid-cols-2 text-white py-8 px-4 lg:px-0">
          {/* Lado esquerdo */}
          <div className="flex flex-col gap-4 items-center justify-center text-center">
            <h2 className="text-5xl font-bold">Seja Bem Vinde!</h2>
            <p className="text-xl italic">
              O melhor do supermercado diretamente para a sua porta.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <Link
                to="/produtos"
                className="rounded text-white bg-[#FE6C02] hover:bg-[#cc5600] py-2 px-4 transition-all"              
              >
                Ver Produtos
              </Link>

              <Link
                to="/categorias"
                className="rounded text-white bg-[#FE6C02] hover:bg-[#cc5600] py-2 px-4 transition-all"
              >
                Ver Categorias
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <img
              src="https://i.postimg.cc/j5YpB9HC/erasebg-transformed.png"
              alt="Imagem Página Home"
              className="w-2/3"
            />
          </div>
        </div>
      </div>

      <div className="bg-white py-8 px-4">
        <h3 className="text-3xl text-center font-bold text-[#FB6822] mb-6">Produtos em Destaque</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-[#fdcb8e] text-white p-6 rounded-lg shadow text-center font-semibold">
            🍞 Pão Integral
          </div>
          <div className="bg-[#fdcb8e] text-white p-6 rounded-lg shadow text-center font-semibold">
            🧃 Suco Natural
          </div>
          <div className="bg-[#fdcb8e] text-white p-6 rounded-lg shadow text-center font-semibold">
            🧀 Queijo Minas
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home