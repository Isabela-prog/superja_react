import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"


function Perfil() {
	const navigate = useNavigate()

	const { usuario } = useContext(AuthContext)

	useEffect(() => {
		if (usuario.token === "") {
			ToastAlerta("Você precisa estar logado", 'info')
			navigate("/")
		}
	}, [usuario.token])

	return (
		<div className="flex justify-center mx-4">
			<div className="container mx-auto my-4 rounded-2xl overflow-hidden">
				<img
					className="w-full h-72 object-cover border-b-8 border-white"
					src="https://i.postimg.cc/g0bjmD1K/a00a6c1d7e13cb6ee7b522db2e4144f5.jpg"
					alt="Capa do Perfil"
				/>

				<img
					className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10"
                    src={usuario.foto || "https://i.postimg.cc/k57vpn1q/35489121b54e34840b7f16f34951eacc.jpg"}


					alt={`Foto de perfil de ${usuario.nome}`}
				/>

				<div
					className="relative mt-[-6rem] h-72 flex flex-col 
                    bg-[#1D907D] text-white text-2xl items-center justify-center"
				>
					<p>Nome: {usuario.nome} </p>
					<p>Email: {usuario.usuario}</p>
				</div>
			</div>
		</div>
	)
}

export default Perfil
