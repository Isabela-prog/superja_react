import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Navbar() {
    const navigate = useNavigate();

    const { handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        alert('O Usuário foi desconectado com sucesso!')
        navigate('/')
    }
    
    return (

    <>
            <div className="flex justify-center bg-[#ceb454] text-white font-poppins font-bold p-5">
            
                <div className="container flex justify-between text-lg">
                <Link to='/home' className="text-2xl font-bold">SuperJa</Link>

                <div className='flex gap-4'>
                    <Link to='/categorias' className='hover:underline'>Categorias</Link>
                    <Link to='/produto' className='hover:underline'>Produto</Link>
                    <Link to='/login' className='hover:underline'>Login</Link>
                    <Link to='/cadastro' className='hover:underline'>Cadastrar Usuario</Link>
                    <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                </div>
                </div>
            </div>
    </>
    )
}

export default Navbar