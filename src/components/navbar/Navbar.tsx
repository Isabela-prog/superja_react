import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
    const navigate = useNavigate();

    const { handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/')
    }

    return (

    <>
            <div className="flex justify-center bg-[#FB6822] text-white font-poppins font-bold p-5">

                <div className="container flex justify-between text-lg">
                <Link to='/home' className="text-2xl font-bold">SuperJa</Link>

                <div className='flex gap-4'>
                    {/* <Link to='/categorias' className='hover:underline'>Categorias</Link>
                    <Link to='/produto' className='hover:underline'>Produto</Link> /}
                    {/ <Link to='/login' className='hover:underline'>Login</Link> */}
                    <Link to='/categorias' className='hover:underline'>Categorias</Link>
                    <Link to='/produtos' className='hover:underline'>Produtos</Link>
                    <Link to='/sobre' className='hover:underline'>Sobre Nós</Link>
                    <Link to='/perfil' className='hover:underline'>Perfil</Link>
                    <Link to='/login' onClick={logout} className='hover:underline'>Sair</Link>
                </div>
                </div>
            </div>
    </>
    )
}

export default Navbar